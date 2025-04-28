import { queryOrderList } from "@/services";
import { useEffect, useState } from 'react';
import { message } from 'antd';
import moment from "moment";

const getInitialList = () => ({
    pageNum: 1,
    total: 0,
    pageSize: 30,
    list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
});
const getInitialOrderQuery = () => ({
    orderNo: undefined,
    timeRange: [],
});
const formatQuery = (query) => {
    const { timeRange = [], orderStatus, algStatus, auditStatus, ...rest } = query;
    const orderBeginTime =
        timeRange[0] && moment(timeRange[0]).format("YYYY-MM-DD HH:mm:ss");
    const orderEndTime =
        timeRange[1] && moment(timeRange[1]).format("YYYY-MM-DD HH:mm:ss");
    const captureBeginTime =
        timeRange[0] && moment(timeRange[0]).format("YYYY-MM-DD HH:mm:ss");
    const captureEndTime =
        timeRange[1] && moment(timeRange[1]).format("YYYY-MM-DD HH:mm:ss");
    let res = {
        ...rest,
        orderBeginTime,
        orderEndTime,
        captureBeginTime,
        captureEndTime
    };
    orderStatus && Object.assign(res, {
        orderStatus
    });
    algStatus && Object.assign(res, {
        algStatus
    });
    auditStatus && Object.assign(res, {
        auditStatus
    });
    return res
};

export default () => {
    const [orderQuery, setOrderQuery] = useState<any>(getInitialOrderQuery())
    const [orderList, setOrderList] = useState<any>(getInitialList())

    // 列表
    const loadOrderList = async (query = {} as any) => {
        const { pageNum, pageSize } = orderList;
        const { captureBeginTime, captureEndTime, ...rest } = formatQuery({
            ...orderQuery,
            pageNum: !!pageNum ? pageNum : 1,
            pageSize: !!pageSize ? pageSize : 20,
            ...query,
        })
        const res = await queryOrderList(rest)
        if (res?.code === 200) {
            setOrderList(res?.data);
        } else {
            message.error(res?.message)
        }
    };

    return {
        setOrderQuery, orderList, loadOrderList,
    }
};
