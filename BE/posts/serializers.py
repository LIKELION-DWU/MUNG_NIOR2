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
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "content", "writer", "answers"]


class MyQuestionSerializer(serializers.ModelSerializer):
    student_id = serializers.ReadOnlyField(source="writer.student_id")
    writer = serializers.ReadOnlyField(source="writer.username")
    questions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["student_id", "writer", "questions"]

    def get_questions(self, obj):
        # Get all related questions for the user
        questions = Question.objects.filter(writer=obj)

        question_data = []
        for question in questions:
            question_item = QuestionSerializer(question).data

            # Get answers related to the question
            answers = Answer.objects.filter(question=question)
            answer_data = AnswerSerializer(answers, many=True).data

            question_item["answers"] = answer_data
            question_data.append(question_item)

        return question_data


class MyAnswerSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source="writer.username")
    teacher_id = serializers.ReadOnlyField(source="writer.teacher_id")
    answers = AnswerSerializer(source="answer_set", many=True, read_only=True)

    class Meta:
        model = User
        fields = ["writer", "teacher_id", "answers"]
