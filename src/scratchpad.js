// some random js hiwh ci had looked at while trying to figure out routes
<div>
<Router>
  <Routes>
    <Route path='/' authenticated={authenticated} element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  } />
    <Route path='/chatroom' authenticated={authenticated} element={
    <PrivateRoute>
      <Chatroom />
    </PrivateRoute>
  } />
  </Routes>
</Router>
</div>

return (
    <div>
      <Router>
        <Route>
          <PublicRoute path='/' authenticated={authenticated} element={<Login />} />
          <Route path='/chatroom' authenticated={authenticated} element={<Chatroom />} />
        </Routes>
      </Router>
    </div>


return (
  <div>
    <Router>
      <Routes>
        {authenticated ? 
          <Route path='/chatroom' 
            authenticated={authenticated} 
            element={<Chatroom />} 
          /> 
        : 
        <Route path='/' 
          authenticated={authenticated} 
          element={<Login />} 
        />
        }          
      </Routes>
    </Router>
  </div>
);

return (
  <div>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route 
          path='/chatroom'
          element={
            <RequireAuth redirectTo='/' authenticated={authenticated} >
              <Chatroom />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  </div>
);
}

return (
  <div>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='chatroom' element={<PrivateRoute> <Chatroom /> </PrivateRoute>} />
      </Routes>
    </Router>
  </div>
);