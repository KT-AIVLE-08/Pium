from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from django import forms
from django.http import JsonResponse
from .models import *
from django.views import View
from rest_framework.generics import ListAPIView
from rest_framework import status
from django.forms.models import model_to_dict
from django.db.models import Max

from mecab import MeCab
import numpy as np
import pandas as pd
import torch
import torch.nn.functional as F
import joblib
import datetime as dt
import json
import os

# LoginView용 라이브러리
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import authenticate, get_user_model
import datetime

from django.contrib.auth.hashers import check_password
from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# 토큰 검증용 라이브러리
from django.conf import settings
import jwt
from rest_framework.permissions import IsAuthenticated

# SignUpView용 라이브러리
from rest_framework import generics, status
from django.views import View
from rest_framework.views import APIView
from django.http import JsonResponse
import json
import re
# TTS 함수 불러오기
from .tts_utils import make_TTS

# 오류 발생 위치 찾기용 로깅

import logging
logger = logging.getLogger(__name__)

# 음성 파일 저장용 
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from urllib.parse import urljoin
from django.views.decorators.csrf import csrf_exempt


class ScenarioViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Scenario.objects.filter(use_yn='Y', visible='Y')   # 사용하는 시나리오만 전달

        # school_name, user_name 필드 추가
        for scenario in queryset:
            scenario.school_name = scenario.school.school_name
            scenario.username = scenario.user.username

        serializer = ScenarioSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        scenserializer = ScenarioSerializer(data=request.data)
        qstserializer = QstSerializer(data=request.data)
        if scenserializer.is_valid():
            scenserializer.save()
        return Response(scenserializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        queryset = Scenario.objects.all()
        scenario = get_object_or_404(queryset, pk=pk)
        serializer = ScenarioSerializer(scenario)
        return Response(serializer.data)

    def delete(self, request, pk=None):
        scenario_instance = get_object_or_404(Scenario, pk=pk)
        scenario_instance.use_yn='N'
        scenario_instance.save()
        return Response({'success': True}, status=status.HTTP_200_OK)

class ScenarioSchoolView(ListAPIView):
    serializer_class = ScenarioSerializer
    def get_queryset(self):
        school_pk = self.kwargs['pk']
        return Scenario.objects.filter(school_id=school_pk, use_yn='Y')

class ScenarioUserView(ListAPIView):
    serializer_class = ScenarioSerializer
    def get_queryset(self):
        user_pk = self.kwargs['pk']
        return Scenario.objects.filter(user_id=user_pk, use_yn='Y')


class QstDeleteView(APIView):
    serializers = QstSerializer
    def get(self, request, pk=None):
        qst_instance = get_object_or_404(Qst, pk=pk)
        qst_instance.use_yn = 'N'
        qst_instance.save()
        return Response({'success': True}, status=status.HTTP_200_OK)


class ScenarioQstViewSet(viewsets.ModelViewSet):
    # 모델들의 queryset 정의
    queryset = Scenario.objects.all()
    # 시리얼라이저 클래스 정의
    serializer_class = ScenarioSerializer

    def list(self, request, *args, **kwargs):
        return Response({'scuuess': True}) #success

    def retrieve(self, request, *args, **kwargs):
        scen_pk = kwargs.get('pk')

        # 시나리오 조회
        scenario_instance = self.get_object()
        scenario_data = self.serializer_class(scenario_instance).data

        # 시나리오pk로 사용하는 문항만 조회
        qsts_data = QstSerializer(Qst.objects.filter(scenario_id=scen_pk, use_yn='Y'), many=True).data

        # 문항 정답 조회
        qsts_pk = [qst['qst_id'] for qst in qsts_data]

        qstansw_data = QstAnswSerializer(QstAnsw.objects.filter(qst__in=qsts_pk).order_by('qst', '-qst_type'), many=True).data

        # qsts에 qstansw 추가
        for qst in qsts_data:
            qst['answer'] = [qstansw for qstansw in qstansw_data if qstansw['qst'] == qst['qst_id']]

        return Response({'scenario': scenario_data, 'qst': qsts_data})

    def create(self, request, *args, **kwargs):
        # 시나리오 데이터 추출, 문항+정답 데이터 추출
        scenario_data = json.loads(request.data.get('scenario', {}))
        qsts_data = json.loads(request.data.get('qst', []))
        print(qsts_data)
        save_folder = '../client/public/scenario'
    
        for file in request.FILES:
            if file != 'scen_image_url':
                original_string = file
                result = re.sub(r'_\d+$', '', original_string)
                #print(result)
                image_name = result
                save_path = os.path.join(save_folder, image_name)
                with open(save_path, 'wb') as destination:
                    for chunk in request.FILES[file].chunks():
                        destination.write(chunk)
            elif file == 'scen_image_url':
                image_name = str(request.FILES[file])
                #print("image_name:" , image_name)
                save_path = '../client/public/scenario/' + image_name
                with open(save_path, 'wb') as destination:
                    for chunk in request.FILES[file].chunks():
                            destination.write(chunk)
            
        # 시나리오 테이블 insert
        usrSchoolId = User.objects.get(user_id=scenario_data['user_id']).school
        scenario_data['school'] = usrSchoolId.school_id
        scenario_data['user'] = scenario_data.pop("user_id")
        scenario_data['scen_image_url'] = '/scenario/' + image_name
        scenario_serializer = self.serializer_class(data=scenario_data)

        if scenario_serializer.is_valid():
            scenario_instance = scenario_serializer.save()
            #print(model_to_dict(scenario_instance))
            #print(scenario_instance.scenario_id)
            #print(qsts_data)

            for i, qst_data in enumerate(qsts_data):
                # Qst 데이터
                qst_data['scenario'] = scenario_instance.scenario_id
                # ----------- qst_voice 부분 추가하기 ----------
                wav_file = make_TTS(scenario_data['title'], qst_data['order_num'], qst_data['qst_text_detail'])
                qst_data['qst_voice_url'] = wav_file

                qst_serializer = QstSerializer(data=qst_data)
                if qst_serializer.is_valid():
                    qst_instance = qst_serializer.save()

                    # QstAnsw 데이터
                    for ans_data in qst_data['answer']:
                        ans_data['qst'] = qst_instance.qst_id
                        qst_answ_serializer = QstAnswSerializer(data=ans_data)
                        if qst_answ_serializer.is_valid():
                            qst_answ_serializer.save()
                        else:
                            return Response({'errors': qst_answ_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'errors': qst_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'success': True}, status=status.HTTP_201_CREATED)
        else:
            return Response({'errors': scenario_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def create_or_update_scenario(self, scenario_data):
        
        usrSchoolId = User.objects.get(user_id=scenario_data['user_id']).school
        scenario_data['school'] = usrSchoolId.school_id
        scenario_data['user'] = scenario_data.pop("user_id")

        # 데이터가 있는지 확인
        scenario_instance = Scenario.objects.filter(scenario_id=scenario_data.get('scenario_id')).first()

        if scenario_instance:
            # 데이터가 있으면 수정
            scenario_serializer = self.serializer_class(instance=scenario_instance, data=scenario_data)
        else:
            # 데이터가 없으면 새로 생성
            scenario_serializer = self.serializer_class(data=scenario_data)
        
        if scenario_serializer.is_valid():
            scenario_instance = scenario_serializer.save()
            return scenario_instance
        else:
            return Response({'errors': scenario_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def create_or_update_qst(self, qst_data, scenario_instance):
        qst_data['scenario'] = scenario_instance.scenario_id
        #음성이 있어도 덮어씌움
        wav_file = make_TTS(scenario_instance.title, qst_data['order_num'], qst_data['qst_text_detail'])
        qst_data['qst_voice_url'] = wav_file

        # 데이터가 있는지 확인
        qst_instance = Qst.objects.filter(qst_id=qst_data.get('qst_id')).first()

        if qst_instance:
            # 데이터가 있으면 수정
            qst_serializer = QstSerializer(instance=qst_instance, data=qst_data)
        else:
            # 데이터가 없으면 새로 생성
            qst_serializer = QstSerializer(data=qst_data)

        if qst_serializer.is_valid():
            qst_instance = qst_serializer.save()

            # QstAnsw 데이터
            for ans_data in qst_data.get('answer', []):
                #print(ans_data)

                qst_answ_instance = QstAnsw.objects.filter(qst_answ_id=ans_data.get('qst_answ_id')).first()

                if qst_answ_instance:
                    qst_answ_serializer = QstAnswSerializer(instance=qst_answ_instance, data=ans_data)
                
                if qst_answ_serializer.is_valid():
                    qst_answ_serializer.save()
                else:
                    return Response({'errors': qst_answ_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'errors': qst_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        scenario_data = request.data.get('scenario', [])
        qsts_data = request.data.get('qst', [])

        # 시나리오 데이터 수정 또는 생성
        scenario_instance = self.create_or_update_scenario(scenario_data)

        # Qst 문항별로 수정 또는 생성
        for qst_data in qsts_data:
            self.create_or_update_qst(qst_data, scenario_instance)

        return Response({'success': True}, status=status.HTTP_200_OK)



class CreateTeacherView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = TeacherSerializer
      
# {
#     "username": "",
#     "login_id": "",
#     "pw": "",
#     "phone_num": "",
#     "school_name": ""
# }      





# 헤더에 토큰을 담아서 보내기 
class HCreateStudentView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = StudentHeaderSerializer 

#      body 
# {
#     "username": "",
#     "class_field": null,    <- 따옴표 없이 숫자만
#     "clas_num": null,    <- 따옴표 없이 숫자만
#     "phone_num": "",
#     "etc": "",
#     "grade": null    <- 따옴표 없이 숫자만
# }       
    
    
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            login_id = request.data['login_id']
            password = request.data['pw']
            print(password)
        except KeyError:
            return Response({'error': 'Missing login_id in request'}, status=status.HTTP_400_BAD_REQUEST)

        # filter를 사용하여 login_id로 사용자 검색
        users = User.objects.filter(login_id=login_id)

        if not users.exists():
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # 여기서는 단 하나의 user만 가져온다고 가정
        user = users.first()

        # 사용자의 비밀번호 가져오기
        user_password = user.pw
        if(check_password(password, user_password)):
            # JWT 토큰 생성
            
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            # 토큰에 School 모델의 school_id 추가
            payload['type'] = user.type if user.type else None
            payload['school_id'] = user.school.school_id if user.school else None
            token = jwt_encode_handler(payload)

            # 로그인 한 사람 로그 기록
            study_log = StudyLog.objects.create(
                user=user,
                ip_address=request.META.get('REMOTE_ADDR'),
                info='Login',
                insert_time=timezone.now()
            )

            return Response({'token': token,'user_id' : user.user_id,'type' : user.type, 'school_id' : user.school.school_id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'password not correct'}, status=status.HTTP_404_NOT_FOUND)
  

# {
#   "login_id": "",
#   "pw": ""
# }

           

# 헤더로 보낸 토큰의 검증 결과를 알려주는 API <- 검증 값을 단독으로 알고싶을때만 호출!!!
class HeaderVerifyTokenView(APIView):
    def post(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        if token is None:
            return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)
        # 'Bearer' 제거
        token = token.split(' ')[1] if len(token.split(' ')) > 1 else token
        try:
            # 토큰 디코딩
            decoded_data = jwt.decode(token, settings.JWT_AUTH['JWT_SECRET_KEY'], algorithms=["HS256"])
            type = decoded_data.get('type', 0)
            school_id = decoded_data.get('school_id', 0)
            user_id = decoded_data.get('user_id', 0)
            return Response({'user_id' : user_id,'type' : type, 'school_id' : school_id, 'success' : 'Token is survive'}, status=status.HTTP_202_ACCEPTED)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({'error': 'Error decoding token'}, status=status.HTTP_400_BAD_REQUEST)


# 헤더로 보낸 토큰 검증을 위한 API    <- 다른 API들에 검증 기능 넣으려고 만든 API, decode_data 값 전부 반환해서 필요한거 빼서 사용 가능
class TokenVerifyMixin(APIView):
    def verify_token(self, request):
        token = request.headers.get('Authorization', None)
        if token is None:
            return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)
        # 'Bearer' 제거
        token = token.split(' ')[1] if len(token.split(' ')) > 1 else token
        try:
            # 토큰 디코딩
            decoded_data = jwt.decode(token, settings.JWT_AUTH['JWT_SECRET_KEY'], algorithms=["HS256"])
            return decoded_data
            # type = decoded_data.get('type', 0)  선생님인지 학생인지 구분할 수 있음
            # return Response({'success' : 'Token is survive'}, status=status.HTTP_202_ACCEPTED)
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.DecodeError:
            return Response({'error': 'Error decoding token'}, status=status.HTTP_400_BAD_REQUEST)



# 토큰에서 원하는 요소(user_id, school_id, type 중에) 추출, 위의 TokenVerifyMixin으로 검증 후 반환된 decode_data 이용
# ex) def function(self, request):
#         decoded_data = self.verify_token(request)
#         if isinstance(decoded_data, Response):  # 토큰 검증 실패 시
#             return decoded_data
#         school_id = token_extraction(decoded_data, 'your_need')
def token_extraction(decoded_data, your_need, default_value=0):
        return decoded_data.get(your_need, default_value)



class StudentsBySchoolView(TokenVerifyMixin):
    def get(self, request):
        decoded_data = self.verify_token(request)
        if isinstance(decoded_data, Response):  # 토큰 검증 실패 시
            return decoded_data
        school_id = token_extraction(decoded_data, 'school_id') # 선생님의 school_id 추출
        students = User.objects.filter(school_id=school_id, type='Student' or 'student')
        serializer = StudentsBySchoolSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StudentUpdateView(TokenVerifyMixin):
    def put(self, request, login_id, *args, **kwargs):
        decoded_data = self.verify_token(request)
        if isinstance(decoded_data, Response):  # 토큰 검증 실패 시
            return decoded_data        
        try:
            # 학생 데이터 가져오기
            student = User.objects.get(login_id=login_id, type='Student' or 'student')

            required_fields = ['grade', 'class_field', 'clas_num', 'phone_num']
            for field in required_fields:
                if field not in request.data:
                    return Response({{"message": "필요한 값이 없습니다."}}, status=status.HTTP_400_BAD_REQUEST)

            # 수정할 필드 업데이트
            student.username = request.data.get('username', student.username)
            student.grade = request.data.get('grade', student.grade)
            student.class_field = request.data.get('class_field', student.class_field)
            student.clas_num = request.data.get('clas_num', student.clas_num)
            student.phone_num = request.data.get('phone_num', student.phone_num)
            student.p_phone_num = request.data.get('p_phone_num', student.p_phone_num)
            student.etc = request.data.get('etc', student.etc)
            school_id = student.school.school_id
            
            user_class = str(request.data.get('class_field')).zfill(2) #숫자 자리수 맞추기(중복 아이디 방지용)
            user_clas_num = str(request.data.get('clas_num')).zfill(2) #숫자 자리수 맞추기(중복 아이디 방지용)
            
            # 학생 아이디 비밀번호 수정(학생 생성때와 같은 규칙)
            student.pw = make_password(student.phone_num[-4:])
            student.login_id = f'{school_id}{student.grade}{user_class}{user_clas_num}'
            
            # 변경사항 저장
            student.save()
            
            # 수정된 데이터 응답
            serializer = StudentHeaderSerializer(student)
            return Response({"message": "학생 수정 완료"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)

class StudentDeleteView(TokenVerifyMixin):
    def delete(self, request, login_id, *args, **kwargs):
        decoded_data = self.verify_token(request)
        if isinstance(decoded_data, Response):  # 토큰 검증 실패 시
            return decoded_data        
        try:
            # 학생 데이터 가져오기
            student = User.objects.get(login_id=login_id, type='Student' or 'student')

            # 학생 데이터 삭제
            student.delete()

            return Response({'message': 'Student deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
        
class ListQuestionMultipleChoiceView(ListAPIView):
    def get(self, request, pk):
        queryset = Qst.objects.filter(scenario=pk)

        qstList = []
        
        for item in queryset:
            qst = {}
            qst['qst_id'] = item.qst_id
            qst['image_url'] = item.image_url
            qst['qst_text_detail'] = item.qst_text_detail
            qst['order_num'] = item.order_num
            qst['qst_voice_url'] = item.qst_voice_url
            
            query_choices = QstAnsw.objects.filter(qst=item.qst_id, qst_type='m')
            choices = []
            for query in query_choices:
                choices.append(query.qst_answ_detail)
            qst['choices'] = choices
            
            qstList.append(qst)
        
        jsonData = {'qstList': qstList}
        
        return JsonResponse(data=jsonData, safe=True)
    
class ApiSimilarityJudgementView(ListAPIView):
    # 임베딩값 평균 계산 함수
    def mean_pooling(self, model_output, attention_mask):
        self.model_output = model_output
        self.attention_mask = attention_mask
        token_embeddings = model_output[0]
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
        return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)
        
    # 유사도 판단 함수
    def similarity_judgement(self, answer, reply):
        self.answer = answer
        self.reply = reply
        # text로 받아진 단어를 명사만 추출
        # 추출한 단어들을 문자열로 합쳐서 반환
        def token_nouns(text):
            text_nouns = mecab.nouns(text)
            text_mecab = ' '.join(text_nouns)
            return text_mecab

        # 모델, 토크나이저 불러오기
        model = joblib.load('../model.pkl')          # model.pkl 경로
        tokenizer = joblib.load('../tokenizer.pkl')  # tokenizer.pkl 경로

        # 정답 예시
        answer = answer

        # 질문 예시
        reply = reply

        # mecab 선언
        mecab = MeCab()

        # 정답 문장 형태소 분석(명사 추출)
        answer_nouns = token_nouns(answer)
        reply_nouns = token_nouns(reply)

        # 단어 추출한 문장 유사도 비교
        compare1 = [answer_nouns, reply_nouns]
        encoded_input1 = tokenizer(compare1, padding=True, truncation=True, return_tensors='pt')

        with torch.no_grad():
            model_output1 = model(**encoded_input1)

        sentence_embeddings1 = self.mean_pooling(model_output1, encoded_input1['attention_mask'])

        # 문장 전체 유사도 비교
        compare2 = [answer, reply]
        encoded_input2 = tokenizer(compare2, padding=True, truncation=True, return_tensors='pt')

        with torch.no_grad():
            model_output2 = model(**encoded_input2)

        sentence_embeddings2 = self.mean_pooling(model_output2, encoded_input2['attention_mask'])

        # 유사도 검사
        similarity1 = F.cosine_similarity(sentence_embeddings1[0], sentence_embeddings1[1], dim = -1)#, dim=1)
        similarity2 = F.cosine_similarity(sentence_embeddings2[0], sentence_embeddings2[1], dim = -1)#, dim=1)
        score = round(similarity1.item() + similarity2.item(), 2)
        
        # 정답 판단
        if score < 0.6:
            judgement = False
        else:
            judgement = True
            
        return score, judgement

    def post(self, request):
        # 받은 데이터를 변수에 각각 저장
        
        data = json.loads(request.body)
        scenario = data['scenario_id']
        qst = data['qst_id']
        std_answ_detail = data['std_answ_detail']
        user_id = data['user_id']
        std_answ_type = data['std_answ_type']
        answ_voice_url = data['answ_voice_url']
        print(answ_voice_url)
        
        # 사용자의 login_id를 불러옴
        user = user_id
        # 요청된 질문의 답에 대한 id 불러옴
        qst_answ_detail = QstAnsw.objects.get(qst_id = qst, qst_type = 's').qst_answ_detail
        
        if std_answ_type == 'm':
            NewStudentAnsw = StudentAnsw()
            NewStudentAnsw.scenario_id = scenario
            NewStudentAnsw.user_id = user
            NewStudentAnsw.qst_id = qst
            NewStudentAnsw.std_answ_detail = std_answ_detail
            NewStudentAnsw.similarity = 0
            NewStudentAnsw.retry_yn = 'N'
            NewStudentAnsw.answ_voice_url = answ_voice_url
            NewStudentAnsw.std_answ_type = 'm'
            NewStudentAnsw.save()
            
            jsonData = {
                "similarity" : 0,
                "judgement" : True,
                "retry_yn" : 'N',
            }
        
            return JsonResponse(data=jsonData, safe=False)
        
        else: # std_answ_type == '주관식으로 대답합':
            score, judgement = self.similarity_judgement(qst_answ_detail, std_answ_detail)
        
            comp_data = StudentAnsw.objects.filter(user = user, scenario = scenario, qst = qst )

            if comp_data:
                retry_yn = 'Y'
            else:
                retry_yn = 'N'
                
            # 처리한 데이터 DB 저장
            NewStudentAnsw = StudentAnsw()
            NewStudentAnsw.scenario_id = scenario
            NewStudentAnsw.user_id = user
            NewStudentAnsw.qst_id = qst
            NewStudentAnsw.std_answ_detail = std_answ_detail
            NewStudentAnsw.similarity = score
            NewStudentAnsw.retry_yn = retry_yn
            NewStudentAnsw.answ_voice_url = answ_voice_url
            NewStudentAnsw.std_answ_type = 's'
            NewStudentAnsw.save()

            # json 데이터로 변환 후 return
            jsonData = {
                "similarity": score,
                "judgement": judgement,
                "retry_yn": retry_yn,
            }
            return JsonResponse(data=jsonData, safe=True)


class RetrieveStudentView(TokenVerifyMixin):
    def post(self, request):
        decoded_data = self.verify_token(request)
        if isinstance(decoded_data, Response):  # 토큰 검증 실패 시
            return decoded_data
        
        school_id = token_extraction(decoded_data, 'school_id') # 선생님의 school_id 추출
        grade = request.data.get('grade', '')
        username = request.data.get('username', '')
        class_field = request.data.get('class_field', '')
        clas_num = request.data.get('clas_num', '')
        
        # 검색한 학생 user_id 추출
        studentId = User.objects.get(school_id=school_id,
                                       type='Student' or 'student',
                                       grade = grade,
                                       username = username,
                                       class_field = class_field,
                                       clas_num = clas_num)
        
        student_user_id = studentId.user_id        
        # 학생이 푼 문제 시나리오 추출
        queryset = StudentAnsw.objects.filter(user_id = student_user_id).values_list('scenario', flat=True).distinct()
        
        scenList = []
        for scen_id in queryset:
            
            scenQuery = Scenario.objects.get(scenario_id = scen_id)
            
            cate_name = ScenarioCategory.objects.get(scen_cate_id = scenQuery.scen_cate_id).cate_name
            title = scenQuery.title
            qst_count = Qst.objects.filter(scenario_id = scen_id).aggregate(order_num = Max('order_num'))['order_num']
            
            scen = {}
            scen['scenario_id'] = scen_id
            scen['user_id'] = student_user_id
            scen['cate_name'] = cate_name
            scen['title'] = title
            scen['qst_count'] = qst_count
            scenList.append(scen)

        return Response(scenList, status=status.HTTP_200_OK)


class RetrieveDetailView(TokenVerifyMixin):
    def post(self, request):
        decoded_data = self.verify_token(request)
        if isinstance(decoded_data, Response):  # 토큰 검증 실패 시
            return decoded_data
        
        scenario_id = request.data.get('scenario_id', '')
        user_id = request.data.get('user_id', '')
        querySet = StudentAnsw.objects.filter(scenario = scenario_id, user = user_id)
        
        detailList = []
        for item in querySet:
            answ = {}
            if item.insert_time:
                answ['insert_time'] = str(item.insert_time)
            else:
                answ['insert_time'] = ''
                
            answ['order_num'] = Qst.objects.get(qst_id = item.qst.qst_id).order_num
            answ['qst_text_detail'] = Qst.objects.get(qst_id = item.qst.qst_id).qst_text_detail
            answ['std_answ_detail'] = item.std_answ_detail
            answ['answ_voice_url'] = item.answ_voice_url
            
            if item.retry_yn == 'Y':
                answ['retry_yn'] = 'Y'
            elif item.retry_yn == 'N':
                answ['retry_yn'] = 'N'
            else:
                answ['retry_yn'] = ' '
                
            if item.std_answ_type == 's':
                answ['std_answ_type'] = '주관식'
            elif item.std_answ_type == 'm':
                answ['std_answ_type'] = '객관식'
            else:
                answ['std_answ_type'] = ' '
            
            detailList.append(answ)

        return Response(detailList, status=status.HTTP_200_OK)

@csrf_exempt
def upload_audio(request):
    if request.method == 'POST' and request.FILES.get('audio'):
        audio_file = request.FILES['audio']
        file_name = default_storage.save('recorded_audio/' + audio_file.name, ContentFile(audio_file.read()))

        # 생성된 URL을 만들어서 클라이언트에 제공
        base_url = request.build_absolute_uri('/')[:-1]  # 기본 URL (e.g., https://pium.site)
        # audio_url = urljoin(base_url + default_storage.url(file_name))
        audio_url = urljoin(base_url, 'api' + default_storage.url(file_name))
        # StudentAnsw 모델의 인스턴스를 생성하고 answ_voice_url에 해당 URL 저장
        # student_answ = StudentAnsw.objects.create(answ_voice_url=audio_url)
        # 여기서 student_answ 인스턴스를 사용하여 다양한 작업을 수행할 수 있음

        # 만약 모델을 사용하지 않고 바로 클라이언트에 전달한다면 JsonResponse로 데이터 반환
        return JsonResponse({'success': True, 'audio_url': audio_url})

    return JsonResponse({'error': 'Invalid request method or no audio file provided'})


def get_audio_url(request, answ_id):
    try:
        student_answ = StudentAnsw.objects.get(student_answ_id=answ_id)
        audio_url = student_answ.answ_voice_url
        return JsonResponse({'audio_url': audio_url})

    except StudentAnsw.DoesNotExist:
        return JsonResponse({'error': 'Audio not found'}, status=404)