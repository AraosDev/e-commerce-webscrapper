import { useEffect, useState } from 'react';
import { LiveFeedProps } from '../../types/common/LiveFeeds';
import './index.css'
import { Button } from 'react-bootstrap';

function LiveFeeds(props: LiveFeedProps) {
  const [feeds, setFeeds] = useState<string[]>([]);

  useEffect(() => {
    if (props.feed) setFeeds((prev) => [...prev, props.feed])
  }, [props.feed]);

  function onClearFeeds() {
    setFeeds([]);
  } 

  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
      <div className='d-flex justify-content-between w-100 px-2'>
        <h5>Live Feeds</h5>
        <Button className="reset-btn" onClick={onClearFeeds}>Clear Logs</Button>
      </div>
      <div className='feed-wrapper'>
        {
          feeds.length ? (feeds.map((feed) => (
            <p>{feed}</p>
          ))) : (
            <p>Waiting for crendentials to be sent...🔜</p>
          )
        }
      </div>
    </div>
  );
}

export default LiveFeeds