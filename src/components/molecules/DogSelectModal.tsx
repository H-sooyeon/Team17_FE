import { useState, PropsWithChildren, useEffect } from 'react';
import * as S from '../../styles/molecules/DogSelectedModal';
import Image from '../atoms/Image';
import { X } from '@phosphor-icons/react';

type ModalDefaultType = {
  onClickToggleModal: () => void;
  onDogSelection: (dogId: number) => void;
};

export default function DogSelectModal({
  onClickToggleModal,
  onDogSelection,
}: PropsWithChildren<ModalDefaultType>) {
  const data = {
    success: true,
    response: {
      dogs: [
        {
          dogId: 1,
          dogImage: './images/dog-sample.png',
          dogName: '춘식이',
        },
        {
          dogId: 2,
          dogImage: './images/dog-sample.png',
          dogName: '밥먹자',
        },
        {
          dogId: 3,
          dogImage: './images/dog-sample.png',
          dogName: '야옹야옹',
        },
      ],
    },
    error: null,
  };

  const [selectedDog, setSelectedDog] = useState<null | number>(null);

  const handleDogSelection = (dogId: number) => {
    setSelectedDog(dogId);
  };

  // 상위props로 dogId 전달
  const handleConfirmation = (dogId: any) => {
    if (selectedDog !== null) {
      onDogSelection(dogId);
      onClickToggleModal();
    }
  };

  return (
    <S.ModalContainer>
      <S.DialogBox>
        <S.CancelButton>
          <div>&nbsp;</div>
          <div className="title"> 등록할 강아지를 선택해 주세요</div>
          <X size="24" onClick={onClickToggleModal} color="black" />
        </S.CancelButton>
        <S.DogContainer>
          {data.response.dogs.map((dog) => (
            <div className="dog" key={dog.dogId}>
              <S.Input
                type="radio"
                id={`dog-${dog.dogId}`} // 라벨과 연결하기 위한 ID 설정
                name="selectedDog"
                value={dog.dogId}
                checked={selectedDog === dog.dogId}
                onChange={() => handleDogSelection(dog.dogId)}
              />
              <S.Label
                htmlFor={`dog-${dog.dogId}`}
                onClick={() => handleDogSelection(dog.dogId)}
              ></S.Label>
              <Image src={dog.dogImage} alt="강아지사진" />

              <span>{dog.dogName}</span>
            </div>
          ))}
        </S.DogContainer>
        {/* 강아지 선택이 안되어 있으면 클릭이 안됌 */}
        <S.Button
          onClick={() => handleConfirmation(selectedDog)}
          disabled={selectedDog === null}
        >
          선택완료
        </S.Button>
      </S.DialogBox>
      <S.Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </S.ModalContainer>
  );
}