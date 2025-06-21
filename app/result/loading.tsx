import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded" />
            <div className="flex-1 text-center">
              <Skeleton className="h-5 w-32 mx-auto mb-1" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Results Loading */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 animate-pulse text-blue-600" />
              <Skeleton className="h-5 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-12 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Loading */}
        <Card>
          <CardHeader className="pb-4">
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-8 flex-1 rounded" />
                <Skeleton className="h-8 flex-1 rounded" />
              </div>
              <Skeleton className="h-64 w-full rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Loading Animation */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-sm font-medium">성장 분석 중...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
