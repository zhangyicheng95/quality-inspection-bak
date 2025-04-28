import { useEffect, useState } from 'react';
import { message } from 'antd'
import { getResult } from '@/services/api';

export default () => {
    const [orderCount, setOrderCount] = useState<number>();
    const [exceptionOrderCount, setExceptionOrderCount] = useState<number>();
    const [result, setResult] = useState<any[]>([]);
    const [processResult, setProcessResult] = useState<any>({
        top: [
            { img: 'https://ts1.tc.mm.bing.net/th/id/R-C.a61375d0a83d84bb2352d0323c1e6fc1?rik=S5EjClrvbvK4Hg&riu=http%3a%2f%2fpic.ntimg.cn%2ffile%2f20180131%2f17961491_115843933000_2.jpg&ehk=eUeG0XIQiyKijvzBdLQC7atp8XUQXVo51Cn%2b29R0qtM%3d&risl=&pid=ImgRaw&r=0', x1: 0.1, y1: 0.1, x2: 0.5, y2: 0.4, radio: 0 }
        ],
        left: [
            { img: 'https://ts2.tc.mm.bing.net/th/id/R-C.a61375d0a83d84bb2352d0323c1e6fc1?rik=S5EjClrvbvK4Hg&riu=http%3a%2f%2fpic.ntimg.cn%2ffile%2f20180131%2f17961491_115843933000_2.jpg&ehk=eUeG0XIQiyKijvzBdLQC7atp8XUQXVo51Cn%2b29R0qtM%3d&risl=&pid=ImgRaw&r=0', x1: 0.1, y1: 0.1, x2: 0.5, y2: 0.4, radio: 0 }
        ],
        right: [
            { img: 'https://ts3.tc.mm.bing.net/th/id/R-C.a61375d0a83d84bb2352d0323c1e6fc1?rik=S5EjClrvbvK4Hg&riu=http%3a%2f%2fpic.ntimg.cn%2ffile%2f20180131%2f17961491_115843933000_2.jpg&ehk=eUeG0XIQiyKijvzBdLQC7atp8XUQXVo51Cn%2b29R0qtM%3d&risl=&pid=ImgRaw&r=0', x1: 0.1, y1: 0.1, x2: 0.5, y2: 0.4, radio: 0 }
        ]
    });
    const [processResultTimes, setProcessResultTimes] = useState(0);
    const [pageNum, setPage] = useState<number>(1);

    const init = async () => {
        if (location.hash?.indexOf('realtime') < 0) return;
        getResult().then(res => {
            if (res?.code === 200) {
                setProcessResult(res.data);
            } else {
                message.error(res?.message || '获取结果失败');
            };
        });
    };

    return {
        orderCount, setOrderCount,
        exceptionOrderCount, setExceptionOrderCount,
        result, setResult,
        processResult, processResultTimes, setProcessResultTimes,
        pageNum, setPage,
        init
    };
}
