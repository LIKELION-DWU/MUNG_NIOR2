from rest_framework.routers import SimpleRouter
from django.urls import path, include
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .views import QuestionViewSet, AnswerViewSet
from rest_framework.routers import DefaultRouter

# from .views import MyQuestionsListView, MyAnswersListView
from .views import UserQuestionListView, UserAnswerListView

questions_router = DefaultRouter()
questions_router.register("questions", QuestionViewSet, basename="questions")

answer_router = SimpleRouter(trailing_slash=True)
answer_router.register(r"answers", AnswerViewSet, basename="answer")
answer_router.register(
    r"questions/(?P<question_id>[^/.]+)/answers",
    AnswerViewSet,
    basename="question-answer",
)

urlpatterns = [
    path("", include(questions_router.urls)),
    path("questions/<int:question_id>/", include(answer_router.urls)),
    path('my_questions/', UserQuestionListView.as_view(), name='my-questions'),    
    path("my_answers/", UserAnswerListView.as_view(), name="my-answers"),
]
