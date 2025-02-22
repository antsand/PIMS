import React from 'react';
import { Container } from 'react-bootstrap';

import * as styled from './styled';
import { DisposalProject } from '.';

interface IProjectLayoutProps extends React.HtmlHTMLAttributes<React.ReactNode> {}

export const ProjectLayout: React.FC<IProjectLayoutProps> = ({ className, children }) => {
  return (
    <styled.ProjectLayout fluid className={`${className} project-layout`}>
      <Container fluid>
        <DisposalProject />
        {children}
      </Container>
    </styled.ProjectLayout>
  );
};
