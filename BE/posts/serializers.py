from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Question, Answer
# from accounts.models import User
from django.contrib.auth import get_user_model

User = get_user_model()



class AnswerSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source="writer.username")  # Add this line
    question_id = serializers.SerializerMethodField()
    answer_id = serializers.ReadOnlyField()

    class Meta:
        model = Answer
        fields = ["question_id", "answer_id", "comment", "photo", "writer"]

    def get_question_id(self, obj):
        return obj.question.id


class QuestionSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source="writer.username")
    student_id = serializers.ReadOnlyField(source="writer.student_id")
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        # fields = ["content","writer", "student_id", "answers"]
        fields = ["id", "content","writer", "student_id", "answers"]


class MyQuestionSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source="writer.username")
    student_id = serializers.ReadOnlyField(source="writer.student_id")
    questions = QuestionSerializer(many=True, read_only=True)
    # questions = QuestionSerializer(source="question_set", many=True, read_only=True)

    class Meta:
        model = User
        fields = ["writer", "student_id", "questions"]




class MyAnswerSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source="writer.username")
    teacher_id = serializers.ReadOnlyField(source="writer.teacher_id")
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ["writer", "teacher_id", "answers"]
