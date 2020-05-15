import Row from '../../components/row';

import {mount} from 'enzyme';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';

const state = {
  ST: '1',
  SC: '11',
  Total: '0',
  deltaconfirmed: '0',
  deltadeaths: '0',
  deltarecovered: '0',
  lastupdatedtime: '30/03/2020 11:27:27',
  Others: '10',
  state: 'Andaman and Nicobar Islands',
  statecode: 'AN',
};

const districts = {
  'South Andaman': {SC: 5, lastupdatedtime: '', delta: {SC: 0}},
  'North and Middle Andaman': {
    SC: 1,
    lastupdatedtime: '',
    delta: {SC: 0},
  },
  Unknown: {SC: 5, lastupdatedtime: '', delta: {SC: 0}},
};

const zones = [
  {
    district: 'Nicobars',
    districtcode: 'AN_Nicobars',
    lastupdated: '01/05/2020',
    source:
      'https://www.facebook.com/airnewsalerts/photos/a.262571017217636/1710062729135117/?type=3&theater',
    state: 'Andaman and Nicobar Islands',
    statecode: 'AN',
    zone: 'Green',
  },
  {
    district: 'North and Middle Andaman',
    districtcode: 'AN_North and Middle Andaman',
    lastupdated: '01/05/2020',
    source:
      'https://www.facebook.com/airnewsalerts/photos/a.262571017217636/1710062729135117/?type=3&theater',
    state: 'Andaman and Nicobar Islands',
    statecode: 'AN',
    zone: 'Green',
  },
  {
    district: 'South Andaman',
    districtcode: 'AN_South Andaman',
    lastupdated: '01/05/2020',
    source:
      'https://www.facebook.com/airnewsalerts/photos/a.262571017217636/1710062729135117/?type=3&theater',
    state: 'Andaman and Nicobar Islands',
    statecode: 'AN',
    zone: 'Red',
  },
];

describe('Row component', () => {
  const RealDate = Date;
  const handleReveal = jest.fn();

  const wrapper = mount(
    <MemoryRouter>
      <table>
        <tbody>
          <Row
            state={state}
            districts={districts}
            index={1}
            total={false}
            reveal={true}
            zones={zones}
            handleReveal={handleReveal}
          />
        </tbody>
      </table>
    </MemoryRouter>
  );

  beforeAll(() => {
    const mockedDate = new Date('2020-04-13T17:11:38.158Z');
    global.Date = class extends Date {
      constructor(date) {
        if (date) return new RealDate(date); // because Row component is using new Date()
        return mockedDate;
      }
    };
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  test('State/UT details', () => {
    const stateSelector = wrapper.find('tr.state');
    const cells = stateSelector.find('td');

    const stateName = cells.at(0).text();
    const SC = cells.at(1).text();
    const ST = cells.at(2).text();
    const Others = cells.at(3).text();
    const Total = cells.at(4).text();

    expect(stateSelector).toHaveLength(1);
    expect(cells).toHaveLength(5);
    expect(stateName).toContain(state.state);
    expect(SC).toEqual('11');
    expect(ST).toEqual('1');
    expect(Others).toEqual('10');
    expect(Total).toEqual('0');
  });

  test('Districts and the SC cases', () => {
    const stateRow = wrapper.find('tr.state');
    expect(stateRow).toHaveLength(1);

    stateRow.simulate('click');

    const districtsSelector = wrapper.find('tr.district');
    const stateLastUpdate = wrapper.find('tr.state-last-update');

    expect(districtsSelector).toHaveLength(3);
    expect(stateLastUpdate.text()).toMatch(/14 days ago/i);

    districtsSelector.forEach((e, index) => {
      const cells = e.find('td');
      const district = cells.at(0).childAt(0).text();
      const confirmedNumber = cells.at(1).text();

      expect(districts[district]).not.toBeUndefined();
      expect(districts[district]['SC']).toEqual(
        parseInt(confirmedNumber)
      );
    });
  });
});
