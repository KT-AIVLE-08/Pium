from django.urls import path, include
from rest_framework_swagger.views import get_swagger_view
from rest_framework.routers import DefaultRouter
from .views import *
from api import views
from django.conf import settings
from django.conf.urls.static import static

#api 관리
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register(r'scenario', ScenarioViewSet, basename='scenario')
router.register(r'scenarioqst', ScenarioQstViewSet, basename='scenarioqst')

schema_view = get_schema_view(
   openapi.Info(
      title="PIUM API",
      default_version='v1',
      description="Pium Site API",
      terms_of_service="https://pium.site",
      contact=openapi.Contact(email="sabrina591447@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   validators=['flex', 'ssv'],
   public=True,
   permission_classes=(permissions.AllowAny,),
)

app_name = 'api'

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login_token'),
    # 선생님 회원가입
    path('teachersignup/', views.CreateTeacherView.as_view(), name = 'teacher_signup'),
    # 학생 생성
    path('studentsignup/', views.HCreateStudentView.as_view(), name = 'student_signup'),

    path('scenario/school/<int:pk>/', ScenarioSchoolView.as_view()),  # 학교별 시나리오 추출
    path('scenario/user/<int:pk>/', ScenarioUserView.as_view()),  # 사용자별 시나리오 추출
    path('qst/<int:pk>/', QstDeleteView.as_view()),   #개별 문항 삭제
    path('similarity/', views.ApiSimilarityJudgementView.as_view(), name='similarity_judgement'),
    path('qa/<int:pk>/', views.ListQuestionMultipleChoiceView.as_view(), name='questionMultipleChoice'),

    # 헤더로 토큰 검증
    path('token/', views.HeaderVerifyTokenView.as_view(), name='tokenbody'),
   
    # 토큰에서 선생님의 school_id 추출해 해당 학교 학생 조회 
    path('students/school/', StudentsBySchoolView.as_view(), name='students_by_school'),
    # 학생의 login_id로 해당 학생 정보 수정 
    path('students/update/<int:login_id>/', StudentUpdateView.as_view(), name = 'students_update'),
    # 학생의 login_id로 해당 학생 정보 삭제
    path('students/delete/<int:login_id>/', StudentDeleteView.as_view(), name='student-delete'),


    path('upload/', upload_audio, name='upload_audio'),
    path('get_audio_url/<int:answ_id>/', get_audio_url, name='get_audio_url'),
    

    # (통계 페이지)학생 검색 조회
    path('stats/retrieve/', RetrieveStudentView.as_view(), name='stats-studnet'),
    path('stats/retrieve/detail/', RetrieveDetailView.as_view(), name='stats-studnet_detail'),

    #api 관리
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)