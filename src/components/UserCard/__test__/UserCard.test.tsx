/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import UserCard from '../index';

describe('UserCard component', () => {
  let container: any = null;

  const userCardProps = {
    handleLike: () => '',
    handlePass: () => {},
    id: '',
    name: 'James',
    profilePic: '',
    bio: 'Hey, stranger',
  };

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('renders without crashing', () => {
    act(() => {
      render(<UserCard {...userCardProps} />, container);
    });
    expect(container.textContent).toBe(`${userCardProps.name},${userCardProps.bio}`);
  });
});
