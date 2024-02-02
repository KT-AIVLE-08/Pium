from .models import *
from rest_framework import serializers

# 회원가입용 라이브러리
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import make_password
import jwt
from django.conf import settings


class ScenarioSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(source='school.school_name', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Scenario
        fields = '__all__'


class QstSerializer(serializers.ModelSerializer):
    class Meta:
        model = Qst
        exclude = ["insert_time"]

class QstAnswSerializer(serializers.ModelSerializer):
    class Meta:
        model = QstAnsw
        fields = ["qst_answ_id", "qst", "qst_answ_detail", "qst_type","insert_time"]


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['school_name']


class TeacherSerializer(serializers.ModelSerializer):
    school_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['type', 'username', 'login_id', 'pw', 'phone_num', 'school_name']

    def create(self, validated_data):
        school_name = validated_data.pop('school_name')
        password = validated_data.pop('pw')  # 평문 비밀번호 꺼내기
        hashed_password = make_password(password)  # 비밀번호 hash화
        school, _ = School.objects.get_or_create(school_name=school_name)

        # 'type' 필드를 수정하거나 설정
        user_type = 'teacher'  # 예시 값
        validated_data['type'] = user_type  # 'type' 값을 업데이트

        # User 인스턴스 생성
        user = User(**validated_data, school=school, pw=hashed_password)
        # User 인스턴스 저장
        user.save()

        return user



# 헤더에 토큰을 담아서 보내기 
class StudentHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['type', 'username', 'class_field', 'clas_num', 'phone_num','p_phone_num', 'etc', 'school_id', 'login_id', 'pw', 'grade']

    def create(self, validated_data):
        user_type = 'student'

        # 헤더에서 토큰 추출
        token = self.context['request'].headers.get('Authorization', None)
        if token is None:
            raise serializers.ValidationError({'error': 'No token provided'})

        # 'Bearer' 제거
        token = token.split(' ')[1] if len(token.split(' ')) > 1 else token

        # 토큰 디코딩
        decoded_data = jwt.decode(token, settings.JWT_AUTH['JWT_SECRET_KEY'], algorithms=["HS256"])
        if(decoded_data.get('type', 0) != 'teacher'):
            raise serializers.ValidationError({'error': 'you are not teacher'})
        
        required_fields = ['grade', 'class_field', 'clas_num', 'phone_num']
        for field in required_fields:
            if field not in validated_data:
                raise serializers.ValidationError({"message": "필요한 값이 없습니다."})
            
        school_id = decoded_data.get('school_id', 0)  # 기본값 0 설정
        user_grade = validated_data.get('grade')
        user_class = str(validated_data.get('class_field')).zfill(2) #숫자 자리수 맞추기(중복 아이디 방지용)
        user_clas_num = str(validated_data.get('clas_num')).zfill(2) #숫자 자리수 맞추기(중복 아이디 방지용)
        user_phone_num = validated_data.get('phone_num')
        
        school, _ = School.objects.get_or_create(school_id=school_id)
        
        # 학생의 아이디 생성('학교 번호' + '학년' + '반' +'반에서의 번호')
        user_login_id = f'{school_id}{user_grade}{user_class}{user_clas_num}'
        # 비밀번호 해쉬화
        user_pw = user_phone_num[-4:]

        hashed_password = make_password(user_pw)
        validated_data['school'] = school
        validated_data['login_id'] = user_login_id
        validated_data['pw'] = hashed_password
        validated_data['type'] = user_type

        user = User(**validated_data)
        user.save()

        return user



class StudentsBySchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'type', 'username', 'class_field', 'clas_num', 'phone_num', 'p_phone_num', 'etc', 'school_id', 'grade']

    

    
    
    

class ScenarioQuestionSerializer(serializers.ModelSerializer):
    qst_id = Qst.objects.filter()
    
    class Meta:
        model = Scenario
        fields= ['scenario_id']
    


class StudentAnswSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAnsw
        fields = '__all__'


