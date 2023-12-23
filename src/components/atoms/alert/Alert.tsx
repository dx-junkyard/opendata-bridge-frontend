import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

import './Alert.scss';
import React from 'react';

type AlertType = 'info' | 'error';

interface AlertProps {
  title: string;
  message?: string;
  type: AlertType;
}

const AlertContent = ({
  title,
  message,
  children,
}: Pick<AlertProps, 'title' | 'message'> & { children: React.ReactNode }) => {
  return (
    <>
      <div>
        {children}
        <strong className="font-bold text-black">{title}</strong>
      </div>
      {message && <p className="text-black">{message}</p>}
    </>
  );
};

export const Alert = ({ title, message, type }: AlertProps) => {
  switch (type) {
    case 'info':
      return (
        <div className="alert border-green-500">
          <AlertContent title={title} message={message}>
            <FontAwesomeIcon
              className="text-green-500 alert__icon"
              icon={faCheckCircle}
            />
          </AlertContent>
        </div>
      );
    case 'error':
      return (
        <div className="alert border-red-500">
          <AlertContent title={title} message={message}>
            <FontAwesomeIcon
              className="text-red-500 alert__icon"
              icon={faCircleXmark}
            />
          </AlertContent>
        </div>
      );
  }
};
