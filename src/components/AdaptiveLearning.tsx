import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ThumbsUpIcon, ThumbsDownIcon, HelpCircleIcon, RefreshCwIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { useToast } from './ui/use-toast';
import { Badge } from './ui/badge';

interface AdaptiveLearningProps {
  assetId: string;
  predictionDate: string;
  predictionDirection: 'Bullish' | 'Bearish' | 'Neutral';
  confidenceTier: 'high' | 'medium' | 'low';
  onFeedbackSubmitted?: () => void;
}

interface FeedbackStats {
  helpful_count: number;
  not_helpful_count: number;
  total_votes: number;
}

const AdaptiveLearning: React.FC<AdaptiveLearningProps> = ({
  assetId,
  predictionDate,
  predictionDirection,
  confidenceTier,
  onFeedbackSubmitted
}) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [feedbackStats, setFeedbackStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already submitted feedback for this prediction
    const feedbackKey = `feedback_${assetId}_${predictionDate}`;
    const existingFeedback = localStorage.getItem(feedbackKey);
    
    if (existingFeedback) {
      setFeedbackSubmitted(true);
      // In a real implementation, we would fetch current stats from the API
      fetchFeedbackStats();
    }
  }, [assetId, predictionDate]);

  const fetchFeedbackStats = async () => {
    // In a real implementation, this would be an actual API call
    // For now, we'll simulate the response
    setTimeout(() => {
      const mockStats: FeedbackStats = {
        helpful_count: 12,
        not_helpful_count: 3,
        total_votes: 15
      };
      
      setFeedbackStats(mockStats);
    }, 500);
  };

  const submitFeedback = async (helpful: boolean) => {
    setLoading(true);
    try {
      // In a real implementation, this would be an actual API call
      // For now, we'll simulate the API call
      const token = localStorage.getItem('token');
      
      // Simulate API delay
      setTimeout(() => {
        // Store feedback in localStorage to remember user's choice
        const feedbackKey = `feedback_${assetId}_${predictionDate}`;
        localStorage.setItem(feedbackKey, helpful ? 'helpful' : 'not_helpful');
        
        // Update feedback stats
        const newStats: FeedbackStats = feedbackStats ? {
          helpful_count: feedbackStats.helpful_count + (helpful ? 1 : 0),
          not_helpful_count: feedbackStats.not_helpful_count + (helpful ? 0 : 1),
          total_votes: feedbackStats.total_votes + 1
        } : {
          helpful_count: helpful ? 1 : 0,
          not_helpful_count: helpful ? 0 : 1,
          total_votes: 1
        };
        
        setFeedbackStats(newStats);
        setFeedbackSubmitted(true);
        setLoading(false);
        
        toast({
          title: 'Feedback Submitted',
          description: 'Thank you for helping improve our predictions!',
          variant: 'default'
        });
        
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted();
        }
      }, 1000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit feedback',
        variant: 'destructive'
      });
      setLoading(false);
    }
  };

  const handleHelpfulClick = () => {
    submitFeedback(true);
  };

  const handleNotHelpfulClick = () => {
    submitFeedback(false);
  };

  const getAdaptiveInsight = () => {
    if (!feedbackStats) return null;
    
    const helpfulPercentage = (feedbackStats.helpful_count / feedbackStats.total_votes) * 100;
    
    if (helpfulPercentage >= 80) {
      return {
        message: "This prediction type is highly valued by users",
        badge: <Badge className="bg-emerald-500">Highly Effective</Badge>
      };
    } else if (helpfulPercentage >= 60) {
      return {
        message: "This prediction type is generally helpful to users",
        badge: <Badge className="bg-blue-500">Effective</Badge>
      };
    } else {
      return {
        message: "Our system is learning to improve this prediction type",
        badge: <Badge className="bg-amber-500">Learning</Badge>
      };
    }
  };

  const adaptiveInsight = getAdaptiveInsight();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Adaptive Learning
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircleIcon className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your feedback helps our system learn and improve predictions over time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>Help improve our prediction accuracy</CardDescription>
      </CardHeader>
      <CardContent>
        {!feedbackSubmitted ? (
          <div className="space-y-4">
            <p className="text-sm">Was this {predictionDirection.toLowerCase()} prediction helpful?</p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleHelpfulClick}
                disabled={loading}
              >
                <ThumbsUpIcon className="h-4 w-4" />
                Yes
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={handleNotHelpfulClick}
                disabled={loading}
              >
                <ThumbsDownIcon className="h-4 w-4" />
                No
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">Thank you for your feedback!</p>
            
            {feedbackStats && (
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Community Feedback</span>
                  {adaptiveInsight?.badge}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <ThumbsUpIcon className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm">{feedbackStats.helpful_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsDownIcon className="h-4 w-4 text-rose-500" />
                    <span className="text-sm">{feedbackStats.not_helpful_count}</span>
                  </div>
                  <div className="text-sm text-muted-foreground ml-auto">
                    {feedbackStats.total_votes} votes
                  </div>
                </div>
                {adaptiveInsight && (
                  <p className="text-sm text-muted-foreground mt-2">{adaptiveInsight.message}</p>
                )}
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              <p>Our system uses your feedback to continuously improve prediction accuracy and relevance.</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Feedback is anonymous and helps personalize your experience.</p>
      </CardFooter>
    </Card>
  );
};

export default AdaptiveLearning;
