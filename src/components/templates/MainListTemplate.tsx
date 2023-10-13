import { Suspense, useEffect, useState } from 'react';
import NotificationList from '../organisms/NotificationList';
import { useInView } from 'react-intersection-observer';
import { fetchNotifications } from '../../apis/notification';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import MainListLoading from '../molecules/MainListLoading';
import FilterModal from '../molecules/FilterModal';

interface Notification {
  dog: {
    name: string,
    sex: string,
    breed: string,
    image: string,
    age: number,
  },
  title: string,
  dog_bowl: string,
  id: number,
  lng: number,
  lat: number,
}

type MainListTemplateProps = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
};

type Filter = {
  size: string[];
  breed: string[];
};

// 사용자 위치에서의 공고글 리스트를 출력한다.
// 무한 스크롤을 사용하여 페이지를 불러온다.
const MainListTemplate = ({
  modalOpen,
  setModalOpen,
  address,
}: MainListTemplateProps) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>({
    size: [],
    breed: [],
  });
  // const { data: notification, isError } = useQuery(['notifications', selectedFilter], () =>
  //   fetchNotifications(selectedFilter))

  const [notificationList, setNotificationList] = useState<Array<Notification>>([
    {
      dog: {
        name: '복슬이',
        sex: 'male',
        breed: '리트리버',
        image: '/images/dog-sample.png',
        age: 1,
      },
      title: '복슬이랑 재밌게 놀며 산책시켜주실 분 찾아요!',
      dog_bowl: '78',
      id: 1,
      lng: 45.24624,
      lat: 47.34637,
    },
    {
      dog: {
        name: '복슬이',
        sex: 'male',
        breed: '리트리버',
        image: '/images/dog-sample.png',
        age: 1,
      },
      title: '복슬이랑 재밌게 놀며 산책시켜주실 분 찾아요!',
      dog_bowl: '78',
      id: 2,
      lng: 45.24624,
      lat: 47.34637,
    },
    {
      dog: {
        name: '복슬이',
        sex: 'male',
        breed: '리트리버',
        image: '/images/dog-sample.png',
        age: 1,
      },
      title: '복슬이랑 재밌게 놀며 산책시켜주실 분 찾아요!',
      dog_bowl: '78',
      id: 3,
      lng: 45.24624,
      lat: 47.34637,
    },
    {
      dog: {
        name: '복슬이',
        sex: 'male',
        breed: '리트리버',
        image: '/images/dog-sample.png',
        age: 1,
      },
      title: '복슬이랑 재밌게 놀며 산책시켜주실 분 찾아요!',
      dog_bowl: '78',
      id: 4,
      lng: 45.24624,
      lat: 47.34637,
    },
  ]); // 공고글 리스트

  // 새로운 공고글을 가져오는 뮤테이션 생성
  // const {mutate} = useMutation({
  //   mutationFn: fetchNotifications,
  // });

  // TODO: 서버 연결 후 테스트 확인 필요
  // const { ref, inView } = useInView();
  // const {
  //   data: notifications,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery(
  //   ['notifications'],
  //   ({ pageParam = 0 }) => fetchNotifications(selectedFilter, pageParam), //
  //   {
  //     getNextPageParam: (lastPage, pages) => {
  //       if (lastPage.data && lastPage.data.length === 0) {
  //         // 마지막 페이지일 경우 NULL을 반환하여 더 이상 페이지를 불러오지 않음
  //         return null;
  //       }
  //       // 다음 페이지를 요청하기 위해 현재 커서 위치를 계산하여 반환
  //       return pages.length + 20;
  //     },
  //     onError: (error) => {
  //       // 에러 발생 시 에러 처리
  //       console.error(error);
  //     },
  //     suspense: true,
  //   },
  // ); // 구분자, API 요청 함수

  // useEffect(() => {
  //   // 페이지가 로드되면 첫 번째 페이지를 요청
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  // 사용자 위치가 변경되면 공고글 리스트 재요청
  // useEffect(() => {
  //   const fetchNotificationsData = async () => {
  //     try {
  //       const response = await fetchNotifications(selectedFilter);
  //       setNotificationList(response?.data?.response.notifications);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchNotificationsData();
  // }, [address]);

  return (
    <div>
      <Suspense fallback={<MainListLoading />}>
        <NotificationList notification={notificationList} />
        {modalOpen && (
          <FilterModal
            setModalOpen={setModalOpen}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
        {/* <div ref={ref}></div> */}
        {/* {isFetchingNextPage && <MainListLoading />} */}
      </Suspense>
    </div>
  );
};

export default MainListTemplate;
