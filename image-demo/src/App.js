import ivitation from './Assets/invitation.jpg';
import './App.css';

function App() {
  return (
    <div className='container'>
      <div className='row col-12'>
        <div className='col'>
          <img src={ivitation} alt='Invitation' style={{ width: '70vh', border: '2px solid #ecb4ffd1', marginTop: '5px', borderRadius: '10px' }} />
        </div>
        <div className='col' style={{ marginTop: '5px' }}>
          <h6 className='mb-0'>Church location</h6>
          <iframe height='90%' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Our%20Lady%20of%20Refugee%20-%20Elathagiri,%20church,%20Elathagiri,%20India+(My%20Business%20Name)&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            <a href="https://www.gps.ie/">gps devices</a>
          </iframe>
        </div>
        <div className='col' style={{ marginTop: '5px' }}>
          <h6 className='mb-0'>Reception location</h6>
          <iframe height='90%' frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sonia%20Kevin%20mahal%20Marriage%20Hall%20Sundampati%20chennai%20salai%20Krishnagiri%20dt%20ah%20wedding+(My%20Business%20Name)&amp;t=k&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            <a href="https://www.gps.ie/">gps tracker sport</a>
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default App;
