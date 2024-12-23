'use client'
import Image from 'next/image'
import { api } from '@/api/api'
import { format } from 'date-fns'
import Link from 'next/link'
import { ResultsNewsPage } from '@/types/News'
import { useInfiniteQuery } from 'react-query'
import { useCallback, useEffect, useRef } from 'react'
import { LoaderCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function News() {
  const observerTarget = useRef<HTMLDivElement>(null)
  async function fetchNews() {
    const response = await api.get('/news/')
    return response.data
  }

  const {
    data: news,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<ResultsNewsPage>(['getNews'], fetchNews, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length === 0 || lastPage.results.length < 50) {
        return undefined
      }
      return pages.length + 1
    },
    staleTime: 1000 * 60,
  })

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    })
    const currentElement = observerTarget.current

    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [handleObserver])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'MMMM d, yyyy')
  }
  const allNews = news?.pages.flatMap((page) => page.results) ?? []
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 px-5 py-3">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>
            <div className="flex bg-[#272927] justify-between p-2 rounded-lg gap-2">
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                {/* Date */}
                <Skeleton className="h-3 w-32" />

                {/* Source */}
                <Skeleton className="h-4 w-24" />

                {/* Title - duas linhas */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
              </div>

              {/* Image */}
              <div className="w-[120px] h-[90px] flex-shrink-0 p-2">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-2 px-5 py-3 pb-[70px]">
      {allNews?.map((newItem, index) => {
        return (
          <Link href={newItem.news_link} target="_blank" key={index}>
            <div className="flex bg-[#272927] justify-between p-2 rounded-lg gap-2">
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="text-xs text-zinc-400">
                  {formatDate(newItem.pub_date)}
                </div>
                <div className="text-sm">{newItem.source}</div>
                <div className="text-xs line-clamp-2">{newItem.title}</div>
              </div>
              <div className="w-[120px] h-[90px] flex-shrink-0 p-2">
                <div className="relative w-full h-full">
                  <Image
                    className="rounded-lg border object-cover"
                    src={newItem.image_link}
                    alt={newItem.title}
                    fill
                    sizes="150px"
                  />
                </div>
              </div>
            </div>
          </Link>
        )
      })}
      <div ref={observerTarget} className="py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <LoaderCircle className="h-8 w-8 animate-spin rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}
