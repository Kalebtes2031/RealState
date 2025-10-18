#realstate_backend/reviews/views.py
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Review, Property
from .serializers import ReviewSerializer


# List all reviews
class ReviewListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        reviews = Review.objects.all().order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


# Create Review
class ReviewCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# List or Retrieve Review
class ReviewDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

# Optional: Update Review (user can edit their own review)
class ReviewUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        return self._update(request, pk, partial=False)

    def patch(self, request, pk):
        return self._update(request, pk, partial=True)

    def _update(self, request, pk, partial):
        review = get_object_or_404(Review, pk=pk)
        if review.user != request.user:
            return Response({'detail': 'Not allowed'}, status=403)
        serializer = ReviewSerializer(review, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

# Optional: Delete Review (user can delete their own review)
class ReviewDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        if review.user != request.user:
            return Response({'detail': 'Not allowed'}, status=403)
        review.delete()
        return Response({'detail': 'Review deleted'}, status=204)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)