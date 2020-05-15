import {formatNumber} from '../utils/commonfunctions';

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useEffectOnce} from 'react-use';

function Level(props) {
  const [data, setData] = useState(props.data);
  const {t} = useTranslation();

  useEffectOnce(() => {
    setData({
      ST: +props.data.ST,
      SC: +props.data.SC,
      Others: +props.data.Others,
      Total: +props.data.Total,
      deltaconfirmed: +props.data.deltaconfirmed,
      deltadeaths: +props.data.deltadeaths,
      deltarecovered: +props.data.deltarecovered,
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
        <h5 className="heading">{t('Active')}</h5>
        <h4>&nbsp;</h4>
        <h1 className="title has-text-info">{formatNumber(data.ST)}</h1>
      </div>

      <div
        className="level-item is-green fadeInUp"
        style={{animationDelay: '1.2s'}}
      >
        <h5 className="heading">{t('Recovered')}</h5>
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
          {formatNumber(data.Others)}{' '}
        </h1>
      </div>

      <div
        className="level-item is-gray fadeInUp"
        style={{animationDelay: '1.3s'}}
      >
        <h5 className="heading">{t('Deceased')}</h5>
        <h4>
          [
          {isNaN(data.deltadeaths)
            ? ''
            : data.deltadeaths > 0
            ? '+' + formatNumber(data.deltadeaths)
            : '+0'}
          ]
        </h4>
        <h1 className="title has-text-grey">{formatNumber(data.Total)}</h1>
      </div>
    </div>
  );
}

export default React.memo(Level);
