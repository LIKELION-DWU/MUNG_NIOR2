from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
# 질문자 model
class Question(models.Model):
    content = models.TextField()
    created_at = models.DateField(verbose_name="작성일", auto_now_add=True)
    
    # writer = models.ForeignKey(
    #     User,
    #     on_delete=models.CASCADE,
    #     null=True,
    #     limit_choices_to={"user_type": "student"},  # student 유저 타입만 접근 가능
    #     default=None,
    # )

    writer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        limit_choices_to={"user_type__exact": "student"},  # user_type이 "student"인 사용자만 접근 가능
    )


    def __str__(self):
        return self.content


# 답변자 model
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateField(verbose_name="작성일", auto_now_add=True)
    photo = models.ImageField(verbose_name="이미지", blank=True, null=True)
    writer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        limit_choices_to={"user_type": "teacher"},  # teacher 유저 타입만 접근 가능
    )

    answer_id = models.PositiveIntegerField(default=0, editable=False)

    def __str__(self):
        return self.comment
