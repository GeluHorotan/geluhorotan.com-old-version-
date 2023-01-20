import { useRef, useState } from 'react';

import Button from '@/components/Button';
import ProjectForm from '@/components/form/ProjectForm';
import ModalWrapper from '@/components/ModalWrapper';
import ProfilePicture from '@/components/ProfilePicture';
import HeroIllustration from '@/components/svgs/HeroIllustration';
import { useAlert } from '@/context/hooks/useAlert';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { createAlert, updateAlert } = useAlert();

  const myRef = useRef<HTMLDivElement>(null);
  const executeScroll = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Main
      meta={
        <Meta
          title="Gelu Horotan - Software Engineer"
          description={`Step into my coder's lair and see what's cookin'. Browse through my projects and see how I can help bring your next software development project to life. `}
        />
      }
    >
      <div className={'flex  h-screen  w-full items-center justify-evenly  '}>
        <div className="flex h-screen  w-1/2 flex-col justify-center ">
          <h1 className="p-2 text-secondary   dark:text-primary">
            Gelu Horotan <br />
            <span className="text-accent_s"> Software Engineer</span>
          </h1>
          <button
            onClick={() => {
              const id = createAlert('Tester');
              setTimeout(() => {
                updateAlert(id, 'Succes', true);
              }, 2000);
            }}
          >
            TEST
          </button>
          <Button
            rounded
            className=" bg-accent p-2  text-secondary"
            type="button"
            onClick={executeScroll}
          >
            SEE MY PROJECTS
          </Button>
        </div>
        <ProfilePicture size={'large'}></ProfilePicture>
        <ProfilePicture size={'medium'}></ProfilePicture>
        <ProfilePicture size={'small'}></ProfilePicture>
        <HeroIllustration />
        {/* <Image src={'/test.jpg'} width={64} height={64}></Image> */}
      </div>
      <div
        ref={myRef}
        className="flex h-screen w-full items-center justify-center gap-20 scroll-smooth bg-red-700"
      >
        <Button type="button" onClick={() => setIsOpen(true)}>
          ADD PROJECT
          <ModalWrapper
            title="Add Project"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            backgroundColor="bg-secondary"
          >
            <ProjectForm />
          </ModalWrapper>
        </Button>
      </div>
      <div></div>
    </Main>
  );
}
