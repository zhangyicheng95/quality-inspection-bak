import './index.less'
import React, { Fragment, useEffect, useState } from 'react'
import { useModel, } from 'umi'
import { message } from 'antd'
import PanelTitle from '@/components/PanelTitle'
import moment from 'moment'
import { isEmpty, isObject } from 'lodash'

const format = (time) => moment(time).format("YYYY-MM-DD HH:mm:ss");

const Realtime: React.FC = () => {
  const { init, processResult } = useModel('realtime' as any);
  const [current1, setCurrent1] = useState<any>({});

  useEffect(() => {
    init();
  }, []);

  console.log(current1);

  return (
    <div className="page-realtime">
      <div className="panel left-panel">
        <PanelTitle>结果汇总</PanelTitle>
        <div className="panel-content">
          <div className="top-bg">
            <div className="top-bg-img">
              <img src="/img/car-face.jpg" alt="" />
            </div>
            {
              <div className="jbt-box">
                {processResult?.top?.map((item: any, index: number) => {
                  const { img, x1, y1, x2, y2, radio } = item;
                  return <div
                    key={index}
                    className={`jbt-box-item-line ${current1?.img === img ? 'jbt-box-item-line-selected' : ''}`}
                    style={{
                      left: x1 * 100 + '%',
                      top: y1 * 100 + '%',
                      right: (1 - x2) * 100 + '%',
                      bottom: (1 - y2) * 100 + '%',
                      borderRadius: radio,
                    }}
                    onClick={() => {
                      if (!isObject(processResult) || isEmpty(processResult)) {
                        message.warning('暂无结果信息');
                        return;
                      }
                      setCurrent1(item);
                    }}
                  />
                })}
              </div>
            }
          </div>
          <div className="bottom-bg">
            {
              ['left', 'right']?.map((_, index: number) => {
                return <div className={`bottom-bg-${index + 1}`} key={_}>
                  {
                    <div className="jbt-box">
                      {processResult?.[_]?.map((item: any, index: number) => {
                        const { img, x1, y1, x2, y2, radio } = item;
                        return <div
                          key={index}
                          className={`jbt-box-item-line ${current1?.img === img ? 'jbt-box-item-line-selected' : ''}`}
                          style={{
                            left: x1 * 100 + '%',
                            top: y1 * 100 + '%',
                            right: (1 - x2) * 100 + '%',
                            bottom: (1 - y2) * 100 + '%',
                            borderRadius: radio,
                          }}
                          onClick={() => {
                            if (!isObject(processResult) || isEmpty(processResult)) {
                              message.warning('暂无结果信息');
                              return;
                            }
                            setCurrent1(item);
                          }}
                        />
                      })}
                    </div>
                  }
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className="panel right-panel">
        <PanelTitle>详细信息</PanelTitle>
        <div className="field stat-detail">
          {
            !!current1.img ?
              <div className="flex-box-center stat-detail-img-box">
                <img src={current1.img} alt="" />
              </div>
              : null
          }
          {
            current1.img &&
            <Fragment>
              <div className="flex-box current-img-info">
                <div className="field">订单时间:&nbsp;{format(current1.time)}</div>
                <div className="field">订单号:&nbsp;{current1.img1 || ''}</div>
                <div className="field">图片序号:&nbsp;{current1.img1 || ''}</div>
                <div className="field">图片名称:&nbsp;{current1?.img1?.split('/')[current1?.img?.split('/').length - 1] || ''}</div>
              </div>
            </Fragment>
          }
        </div>
      </div>
    </div>
  )
}

export default Realtime

const tbgLines = [
  {
    label: 1,
    x1: 0.37,
    y1: 0.14,
    x2: 0.6,
    y2: 0.18
  },
  {
    label: 2,
    x1: 0.695,
    y1: 0.115,
    x2: 0.835,
    y2: 0.25,
    radio: '50%',
  },
  {
    label: 3,
    x1: 0.37,
    y1: 0.78,
    x2: 0.61,
    y2: 0.825
  },
  {
    label: 4,
    x1: 0.695,
    y1: 0.715,
    x2: 0.835,
    y2: 0.85,
    radio: '50%',
  }
];