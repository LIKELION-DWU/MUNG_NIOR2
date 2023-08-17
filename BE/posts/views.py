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
from rest_framework.exceptions import NotFound

# from rest_framework import generics
from rest_framework.generics import ListAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from django.contrib.auth import get_user_model

User = get_user_model()


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user_name = self.request.data.get("writer")  # 프론트엔드에서 전송한 사용자 이름
        user = User.objects.get(username=user_name)  # 사용자 인스턴스 가져오기
        serializer.save(writer=user, student_id=user.student_id)

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


# 유저 관련해서 프론트랑 다시 시도해보기
# class UserQuestionListView(ListAPIView):
#     serializer_class = MyQuestionSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         user = self.request.user
#         return Question.objects.filter(writer=user)
#         # return User.objects.filter(id=user.id)

class UserQuestionListView(APIView):
    # permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user

        # Get questions related to the user
        questions = Question.objects.filter(writer=user)

        question_data = []
        for question in questions:
            question_item = QuestionSerializer(question).data

            # Get answers related to the question
            answers = Answer.objects.filter(question=question)
            answer_data = AnswerSerializer(answers, many=True).data

            question_item["answers"] = answer_data
            question_data.append(question_item)

        user_data = {
            "student_id": user.student_id,
            "writer": user.username,
            "questions": question_data
        }

        return Response(user_data)

# class UserAnswerListView(ListAPIView):
#     serializer_class = MyAnswerSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         teacher_id = self.request.user.teacher_id  # 선생님의 teacher_id 가져오기
#         return User.objects.filter(id=teacher_id)

class UserAnswerListView(APIView):
    # permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user

        # Get answers related to the user
        answers = Answer.objects.filter(writer=user)

        answer_data = AnswerSerializer(answers, many=True).data

        user_data = {
            "teacher_id": user.teacher_id,
            "writer": user.username,
            "answers": answer_data
        }

        return Response(user_data)

