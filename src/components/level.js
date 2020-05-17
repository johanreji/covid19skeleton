import {formatNumber} from '../utils/commonfunctions';

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useEffectOnce} from 'react-use';

function Level(props) {
  const [data, setData] = useState(props.data);
  console.log('god = ',data);
  const {t} = useTranslation();

  useEffectOnce(() => {
    setData({
      SC: +props.data.SC,
      ST: +props.data.ST,
      OBC: +props.data.OBC,
      deltaconfirmed: 10,

      deltarecovered: 20,
    });
  });

  return (
    <div className="Level">
      <div
        className="level-item is-cherry fadeInUp"
        style={{animationDelay: '1s'}}
      >
        <h5>{t('SC')}</h5>
        <h4>
          [
          {isNaN(data.deltaconfirmed)
            ? ''
            : data.deltaconfirmed > 0
            ? '+' + formatNumber(data.deltaconfirmed)
            : '+0'}
          ]
        </h4>
        <h1>{formatNumber(data.SC)} </h1>
      </div>

      <div
        className="level-item is-blue fadeInUp"
        style={{animationDelay: '1.1s'}}
      >
        <h5 className="heading">{t('ST')}</h5>
        <h4>&nbsp;</h4>
        <h1 className="title has-text-info">{formatNumber(data.ST)}</h1>
      </div>

      <div
        className="level-item is-green fadeInUp"
        style={{animationDelay: '1.2s'}}
      >
        <h5 className="heading">{t('OBC')}</h5>
        <h4>
          [
          {isNaN(data.deltarecovered)
            ? ''
            : data.deltarecovered > 0
            ? '+' + formatNumber(data.deltarecovered)
            : '+0'}
          ]
        </h4>
        <h1 className="title has-text-success">
          {formatNumber(data.OBC)}{' '}
        </h1>
      </div>

    </div>
  );
}

export default React.memo(Level);
