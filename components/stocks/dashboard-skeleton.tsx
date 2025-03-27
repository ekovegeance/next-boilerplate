import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export  function DashboardSkeloton() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="hidden w-64 flex-shrink-0 border-r bg-gray-100 p-4 lg:block">
        <div className="space-y-4">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-[140px]" />
          <Skeleton className="h-4 w-[130px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Skeleton */}
        {/* <header className="flex h-16 items-center justify-between border-b px-4">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </header> */}

        {/* Dashboard Content Skeleton */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <Skeleton className="h-9 w-[250px]" />
          </div>

          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-[100px]" />
                  </CardTitle>
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-[120px]" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-[150px]" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Skeleton className="h-[200px]" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-[150px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px]" />
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-[150px]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

