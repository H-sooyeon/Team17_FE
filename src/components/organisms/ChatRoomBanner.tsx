import * as S from '../../styles/molecules/ProfileBanner';
import ChatRoomBannerItem from '../molecules/ChatRoomBannerItem';
import { useLocation } from 'react-router-dom';
import Spinner from '../atoms/Spinner';

const ChatRoomBanner = () => {
  const { state } = useLocation();
  console.log('state', state);

  return (
    <S.Container>
      {state.userInfo ? <ChatRoomBannerItem userinfo={state} /> : ''}
    </S.Container>
  );
};

export default ChatRoomBanner;
