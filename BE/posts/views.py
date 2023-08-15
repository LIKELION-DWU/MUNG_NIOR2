from django.shortcuts import render
from django.db.models import Q
from .models import Question, Answer
from .serializers import (
    QuestionSerializer,
    AnswerSerializer,
    MyQuestionSerializer,
    MyAnswerSerializer,
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

# from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from django.contrib.auth import get_user_model

User = get_user_model()


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    permission_classes = [AllowAny]

    # def perform_create(self, serializer):
    #     serializer.save(writer=self.request.user.username)
    def perform_create(self, serializer):
        user_name = self.request.data.get("writer")  # 프론트엔드에서 전송한 사용자 이름
        user = User.objects.get(username=user_name)  # 사용자 인스턴스 가져오기
        serializer.save(writer=user)



class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        question_id = self.kwargs.get("question_id")
        question = get_object_or_404(Question, pk=question_id)
        next_answer_id = Answer.objects.filter(question=question).count() + 1

        user_name = self.request.data.get("writer")
        user = User.objects.get(username=user_name)

        serializer.save(
            writer=user, question=question, answer_id=next_answer_id
        )

    def get_queryset(self, **kwargs):
        id = self.kwargs["question_id"]
        return self.queryset.filter(question=id)

# class UserQuestionListView(ListAPIView):
#     serializer_class = MyQuestionSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user.username
#         # return User.objects.filter(id=user.id)
#         return User.objects.filter(writer=user)


# class UserAnswerListView(ListAPIView):
#     serializer_class = MyAnswerSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return User.objects.filter(id=user.id)


class UserQuestionListView(ListAPIView):
    serializer_class = MyQuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)


class UserAnswerListView(ListAPIView):
    serializer_class = MyAnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(id=user.id)