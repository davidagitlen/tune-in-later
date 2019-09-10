describe('Route', () => {

  it('should route to the homepage by default and display BooksDisplays for the results of the landingFetch', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(BooksDisplay)).toHaveLength(5);
  });

  it('should route to the login form when the login link is clicked', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(LoginForm)).toHaveLength(1);
    expect(wrapper.find(NewUserForm)).toHaveLength(1);
  });

  it('should route to the user\'s personal collection and display them in a BooksDisplay when the my collection link is clicked', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/my-collection']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(BooksDisplay)).toHaveLength(1);
  });

});