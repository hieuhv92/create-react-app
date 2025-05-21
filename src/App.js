import './App.scss';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Use class component => old
// class App extends React.Component {
//   render() {
//     return (
//       <div className='app-container'>
//         <MyComponent></MyComponent>
//       </div>
//     )
//   }
// }

//Using function component => new, use react hook to replace using state
const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'></div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default App;
