# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.utils import timezone

class Qst(models.Model):
    qst_id = models.AutoField(primary_key=True)
    scenario = models.ForeignKey('Scenario', models.DO_NOTHING, blank=True, null=True)
    image_url = models.CharField(max_length=100, blank=True, null=True)
    qst_text_detail = models.CharField(max_length=255, blank=True, null=True)
    qst_voice_url = models.CharField(max_length=255, blank=True, null=True)
    order_num = models.IntegerField(blank=True, null=True, db_comment='문항순서')
    use_yn = models.CharField(default='Y', max_length=10, blank=True, null=True)
    insert_time = models.DateTimeField(default=timezone.now, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'qst'


class QstAnsw(models.Model):
    qst_answ_id = models.AutoField(primary_key=True)
    qst = models.ForeignKey(Qst, models.DO_NOTHING)
    qst_answ_detail = models.CharField(max_length=255, blank=True, null=True)
    qst_type = models.CharField(max_length=50, blank=True, null=True)
    insert_time = models.DateTimeField(default=timezone.now, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'qst_answ'


class Scenario(models.Model):
    scenario_id = models.AutoField(primary_key=True)
    school = models.ForeignKey('School', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    scen_cate = models.ForeignKey('ScenarioCategory', models.DO_NOTHING, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    scen_image_url = models.CharField(max_length=100, blank=True, null=True)
    describe = models.CharField(max_length=255, blank=True, null=True)
    visible = models.CharField(max_length=10, blank=True, null=True)
    level = models.IntegerField(blank=True, null=True)
    use_yn = models.CharField(default='Y', max_length=50, blank=True, null=True)
    insert_time = models.DateTimeField(default=timezone.now, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'scenario'


class ScenarioCategory(models.Model):
    scen_cate_id = models.AutoField(primary_key=True)
    cate_name = models.CharField(max_length=50, blank=True, null=True)
    use_yn = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'scenario_category'


class School(models.Model):
    school_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    school_name = models.CharField(max_length=50, unique=True, blank=True, null=True)
    insert_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'school'
        db_table_comment = '학교'

    # def __str__(self):
    #     return str(self.school_name)


class StudentAnsw(models.Model):
    student_answ_id = models.AutoField(primary_key=True)
    scenario = models.ForeignKey(Scenario, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    qst = models.ForeignKey(Qst, models.DO_NOTHING, blank=True, null=True)
    std_answ_detail = models.CharField(max_length=255, blank=True, null=True)
    answ_voice_url = models.CharField(max_length=100, blank=True, null=True)
    similarity = models.FloatField(blank=True, null=True)
    retry_yn = models.CharField(max_length=50, blank=True, null=True)
    insert_time = models.DateTimeField(default=timezone.now, blank=True, null=True)
    std_answ_type = models.CharField(max_length=45, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'student_answ'


class StudyLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)
    ip_address = models.CharField(max_length=50, blank=True, null=True)
    info = models.CharField(max_length=50, blank=True, null=True)
    insert_time = models.DateTimeField(default=timezone.now, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'study_log'


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    school = models.ForeignKey(School, models.DO_NOTHING, blank=True, null=True)
    type = models.CharField(max_length=10, blank=True, null=True, db_comment='s/t/o')
    login_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    pw = models.CharField(max_length=300, blank=True, null=True)
    username = models.CharField(max_length=50, blank=True, null=True)
    grade = models.IntegerField(blank=True, null=True)
    class_field = models.IntegerField(db_column='class', blank=True, null=True)  # Field renamed because it was a Python reserved word.
    clas_num = models.IntegerField(blank=True, null=True)
    phone_num = models.CharField(max_length=50, blank=True, null=True)
    p_phone_num = models.CharField(max_length=50, blank=True, null=True)
    etc = models.CharField(max_length=255, blank=True, null=True)
    insert_time = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        #managed = False
        db_table = 'user'

class AudioFile(models.Model):
    wav_file = models.FileField(upload_to='./static/std_answ_std_answ_voice/')