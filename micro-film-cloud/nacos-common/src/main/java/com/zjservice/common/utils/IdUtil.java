package com.zjservice.common.utils;

/**
 * @author zj
 * @Description 使用twitter的SnowFlake生成18位纯数字ID，适用于微服务、分布式服务中(例如:377874751659577347)
 * @date 2019/10/5 0005
 */
@SuppressWarnings("AlibabaUndefineMagicConstant")
public class IdUtil {

    /** 起始的时间戳*/
    private final static long START_STMP = 1480166465631L;

    /** 序列号占用的位数*/
    private final static long SEQUENCE_BIT = 12;
    /** 机器标识占用的位数*/
    private final static long MACHINE_BIT = 5;
    /** 数据中心占用的位数*/
    private final static long DATACENTER_BIT = 5;

    /** 每一部分的最大值*/
    private final static long MAX_DATACENTER_NUM = ~(-1L << DATACENTER_BIT);
    private final static long MAX_MACHINE_NUM = ~(-1L << MACHINE_BIT);
    private final static long MAX_SEQUENCE = ~(-1L << SEQUENCE_BIT);

    /** 每一部分向左的位移*/
    private final static long MACHINE_LEFT = SEQUENCE_BIT;
    private final static long DATACENTER_LEFT = SEQUENCE_BIT + MACHINE_BIT;
    private final static long TIMESTMP_LEFT = DATACENTER_LEFT + DATACENTER_BIT;

    /** 数据中心*/
    private long datacenterId;
    /** 机器标识*/
    private long machineId;
    /** 序列号*/
    private long sequence = 0L;
    /** 上一次时间戳*/
    private long lastStmp = -1L;

    public IdUtil(long datacenterId, long machineId) {
        if (datacenterId > MAX_DATACENTER_NUM || datacenterId < 0) {
            throw new IllegalArgumentException("datacenterId can't be greater than MAX_DATACENTER_NUM or less than 0");
        }
        if (machineId > MAX_MACHINE_NUM || machineId < 0) {
            throw new IllegalArgumentException("machineId can't be greater than MAX_MACHINE_NUM or less than 0");
        }
        this.datacenterId = datacenterId;
        this.machineId = machineId;
    }

    /**
     * 产生下一个ID
     * @return 下一个Id
     */
    public synchronized long nextId() {
        long currStmp = getNewstmp();
        if (currStmp < lastStmp) {
            throw new RuntimeException("Clock moved backwards.  Refusing to generate id");
        }

        if (currStmp == lastStmp) {
            //相同毫秒内，序列号自增
            sequence = (sequence + 1) & MAX_SEQUENCE;
            //同一毫秒的序列数已经达到最大
            if (sequence == 0L) {
                currStmp = getNextMill();
            }
        } else {
            //不同毫秒内，序列号置为0
            sequence = 0L;
        }

        lastStmp = currStmp;

        //时间戳部分
        return (currStmp - START_STMP) << TIMESTMP_LEFT
                | datacenterId << DATACENTER_LEFT       //数据中心部分
                | machineId << MACHINE_LEFT             //机器标识部分
                | sequence;                             //序列号部分
    }

    private long getNextMill() {
        long mill = getNewstmp();
        while (mill <= lastStmp) {
            mill = getNewstmp();
        }
        return mill;
    }

    private long getNewstmp() {
        return System.currentTimeMillis();
    }

//    public static void main(String[] args) {
//        IdUtil idUtil = new IdUtil(1, 1);
//        long start = System.currentTimeMillis();
//        for (int i = 0; i < 1000000; i++) {
//            System.out.println(idUtil.nextId());
//        }
//        System.out.println(System.currentTimeMillis() - start);
//    }

}
