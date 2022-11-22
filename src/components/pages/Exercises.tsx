import type { NextPage } from 'next';
import { trpc } from '../../utils/trpc';
import Exercise from './Exercise';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonSpinner
} from '@ionic/react';
import { useEffect } from 'react';

const ExerciseEntry = (props) => (
  <IonItem
    routerLink={`/tabs/exercises/${props.exercise.id}`}
    className="exercise-entry"
  >
    <IonLabel>
      <h1>{props.exercise.title}</h1>
      <p>{props.exercise.summary}</p>
      <p>{props.exercise.author.name}</p>
    </IonLabel>
  </IonItem>
);

const AllExercises = () => {
  const { data: exercises } = trpc.exercise.getAllMinimial.useQuery();
  return (
    <>
      {!exercises ? (
        <IonSpinner></IonSpinner>
      ) : (
        exercises.map((exercise, i) => (
          <ExerciseEntry key={i} exercise={exercise} />
        ))
      )}
    </>
  );
};

const Exercises: NextPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Exercises</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Exercises</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AllExercises />
      </IonContent>
    </IonPage>
  );
};

export default Exercises;
