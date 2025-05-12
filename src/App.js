import './App.scss';

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
      Hello World!!
    </div>
  );
}

export default App;
