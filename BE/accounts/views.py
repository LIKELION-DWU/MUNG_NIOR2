import urllib
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import status
from .models import User
from django.contrib.auth import authenticate, logout, login
from .serializers import (
    StudentSignUpSerializer,
    TeacherSignUpSerializer,
    UserLoginSerializer,
)


class StudentSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = StudentSignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(user_type="student")
            user.set_password(user.phone_number)
            user.save()

            token = Token.objects.create(user=user)
            return Response(
                {"Token": token.key}
                # {"message": "Student 회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        students = User.objects.filter(user_type="student")
        serializer = StudentSignUpSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TeacherSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TeacherSignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(user_type="teacher")
            user.set_password(user.phone_number)
            user.save()
            token = Token.objects.create(user=user)
            return Response(
                  {"Token": token.key}
                # {"message": "Teacher 회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        teachers = User.objects.filter(user_type="teacher")
        serializer = TeacherSignUpSerializer(teachers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class StudentLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            phone_number = serializer.validated_data["phone_number"]

            user = authenticate(
                request=request,
                username=username,
                password=phone_number,
            )

            if user is not None and user.user_type == "student":
                token = Token.objects.get(user=user)
                login(request, user)
                return Response(
                    {"Token": token.key}
                    # {"message": "Student 로그인 되었습니다."},
                    # status=status.HTTP_200_OK,
                )

        return Response(
            {"message": "로그인 정보가 올바르지 않습니다."}, status=status.HTTP_401_UNAUTHORIZED
        )

    def get(self, request):
        if request.user.is_authenticated and request.user.user_type == "student":
            serializer = UserLoginSerializer(
                request.user
            )  # UserSerializer는 적절한 시리얼라이저 이름으로 변경해야 합니다.
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"message": "인증되지 않았거나 학생이 아닙니다."}, status=status.HTTP_401_UNAUTHORIZED
        )


class TeacherLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            phone_number = serializer.validated_data["phone_number"]

            user = authenticate(
                request=request,
                username=username,
                password=phone_number,
            )

            if user is not None and user.user_type == "teacher":
                token = Token.objects.get(user=user)
                login(request, user)
                return Response(
                    {"Token": token.key}
                    # {"message": "Teacher 로그인 되었습니다."},
                    # status=status.HTTP_200_OK,
                )

        return Response(
            {"message": "로그인 정보가 올바르지 않습니다."}, status=status.HTTP_401_UNAUTHORIZED
        )

    def get(self, request):
        if request.user.is_authenticated and request.user.user_type == "teacher":
            serializer = UserLoginSerializer(
                request.user
            )  # UserSerializer는 적절한 시리얼라이저 이름으로 변경해야 합니다.
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"message": "인증되지 않았거나 선생님이 아닙니다."}, status=status.HTTP_401_UNAUTHORIZED
        )


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "로그아웃 되었습니다."}, status=status.HTTP_200_OK)


# code 요청
def kakao_login(request):
    app_rest_api_key = "942c23a0e6d71ed610295448ee869edc"
    redirect_uri = "http://127.0.0.1:8000/kakao/callback"
    redirect_url = (
        "https://kauth.kakao.com/oauth/authorize?client_id="
        + app_rest_api_key
        + "&redirect_uri="
        + redirect_uri
        + "&response_type=code"
    )
    return redirect(redirect_url)
    # return redirect(
    #     f"https://kauth.kakao.com/oauth/authorize?client_id={app_rest_api_key}&redirect_uri={redirect_uri}&response_type=code"
    # )


# access token 요청
def kakao_callback(request):
    params = urllib.parse.urlencode(request.GET)
    redirect_url = "http://127.0.0.1:8000/kakao/callback?" + params
    main_home_url = "http://127.0.0.1:8000"
    return redirect(main_home_url)
    # return redirect(redirect_url)
    # return redirect(f'http://127.0.0.1:8000/kakao/callback?{params}')
