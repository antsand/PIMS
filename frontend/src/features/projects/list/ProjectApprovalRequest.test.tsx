import { ProjectApprovalRequestListView } from '.';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ILookupCode } from 'actions/ILookupCode';
import * as API from 'constants/API';
import { Provider } from 'react-redux';
import * as reducerTypes from 'constants/reducerTypes';
import service from '../apiService';
import { noop } from 'lodash';
import { Formik } from 'formik';
import { useKeycloak } from '@react-keycloak/web';

jest.mock('@react-keycloak/web');
(useKeycloak as jest.Mock).mockReturnValue({
  keycloak: {
    userInfo: {
      agencies: [1],
      roles: [],
    },
    subject: 'test',
  },
});

const testData = {
  items: [
    {
      projectNumber: 'SPP-10015',
      name: 'Project name 16',
      statusId: 0,
      status: 'Approval',
      tierLevelId: 1,
      tierLevel: 'Tier 1',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      note: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      agencyId: 35,
      agency: 'AEST',
      subAgency: 'UOV',
      properties: [
        {
          id: 1,
          propertyTypeId: 1,
          description:
            'Gym, teaching kitchen, energy lab, greenhouse. Building full name: Center for Excellence in Sustainability',
          classification: 'Core Operational',
          agencyId: 0,
          subAgency: 'Nichola Valley Institute of Technology',
          agencyCode: 'AEST',
          address: '4155 Belshaw St',
          city: 'Merritt',
          netBook: 0,
          assessed: 0,
          market: 0,
          landArea: 26.9,
          createdOn: '2020-05-28T18:48:03.181977',
          rowVersion: 'AAAAAAAAfRA=',
        },
      ],
      createdBy: 'User, Administrator',
      createdOn: '2020-05-28T18:48:03.181976',
      rowVersion: 'AAAAAAAAfQ8=',
    },
  ],
  page: 1,
  quantity: 10,
  pageIndex: 0,
  total: 1,
};

// Set all module functions to jest.fn
jest.mock('../apiService');
const mockedService = service as jest.Mocked<typeof service>;

const mockStore = configureMockStore([thunk]);

const lCodes = {
  lookupCodes: [
    { name: 'agencyVal', id: '1', isDisabled: false, type: API.AGENCY_CODE_SET_NAME },
    {
      name: 'classificationVal',
      id: '1',
      isDisabled: false,
      type: API.PROPERTY_CLASSIFICATION_CODE_SET_NAME,
    },
  ] as ILookupCode[],
};

const store = mockStore({
  [reducerTypes.LOOKUP_CODE]: lCodes,
});

const history = createMemoryHistory();

describe('Project Approval Request list view', () => {
  // clear mocks before each test
  beforeEach(() => {
    mockedService.getProjectList.mockClear();
    mockedService.deleteProject.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('Matches snapshot', async () => {
    mockedService.getProjectList.mockResolvedValueOnce(testData as any);

    const { container } = render(
      <Formik initialValues={{}} onSubmit={noop}>
        <Provider store={store}>
          <Router history={history}>
            <ProjectApprovalRequestListView />
          </Router>
        </Provider>
      </Formik>,
    );
    await waitFor(() => expect(service.getProjectList).toHaveBeenCalledTimes(1), { timeout: 500 });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Displays message for empty list', async () => {
    mockedService.getProjectList.mockResolvedValueOnce({
      quantity: 0,
      total: 0,
      page: 1,
      pageIndex: 0,
      items: [],
    });

    const { findByText } = render(
      <Formik initialValues={{}} onSubmit={noop}>
        <Provider store={store}>
          <Router history={history}>
            <ProjectApprovalRequestListView />
          </Router>
        </Provider>
      </Formik>,
    );

    // default table message when there is no data to display
    await waitFor(() => expect(service.getProjectList).toHaveBeenCalledTimes(1), { timeout: 500 });
    const noResults = await findByText('No rows to display');
    expect(noResults).toBeInTheDocument();
  });
});
