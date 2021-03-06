const data = {
  "电子信息与电气工程学院(计算机系)": [
    "安全分析",
    "图计算",
    "深度学习",
    "网络数据",
    "数据预测",
    "网络特征学习",
    "深度神经网络",
    "神经网络模型",
  ],
  船舶海洋与建筑工程学院: [
    "结构动力",
    "理论模型",
    "耦合分析 ",
    "结构优化 ",
    "系统性能",
    "优化系统 ",
    "动力性能",
    "结构性能 ",
  ],
  机械与动力工程学院: [
    "振动分析",
    "项目控制",
    "控制方法",
    "结构优化",
    "力优化",
  ],
  电子信息与电气工程学院: [
    "故障智能",
    "气体控制",
    "管理优化",
    "功率优化",
    "负荷优化",
    "功率控制",
    "直流故障",
  ],
  "电子信息与电气工程学院(电气系)": [
    "故障智能",
    "气体控制",
    "管理优化",
    "功率优化",
    "负荷优化",
    "功率控制",
    "直流故障",
  ],
  "电子信息与电气工程学院(自动化系)": [
    "机器人网络",
    "网络模型",
    "系统模型",
    "估计网络",
    "视觉目标检测",
    "学习算法",
    "学习预测控制",
  ],
  "电子信息与电气工程学院(电子系)": [
    "调制技术",
    "检测算法",
    "信号识别",
    "检测系统",
    "雷达信号",
    "光纤传输系统",
  ],
  "电子信息与电气工程学院(仪器系)": [
    "阻抗技术",
    "优化法",
    "测量特性",
    "检测机器人",
    "技术分析",
    "测量系统",
    "阻抗法",
    "机器人控制",
  ],
  "电子信息与电气工程学院(网络空间安全学院)": [
    "视频编码",
    "安全攻击",
    "攻击检测",
    "云计算",
    "风险评估",
    "安全风险",
    "神经网络模型",
  ],
  "电子信息与电气工程学院(软件学院)": [
    "云计算平台",
    "预测分析",
    "预测模型",
    "移动测试",
    "管理服务",
    "移动云平台",
    "云计算",
    "信息模型",
  ],
  "电子信息与电气工程学院(微纳电子学系)": [
    "检测算法",
    "测试算法",
    "柔性mems",
    "传感器网络",
    "数字检测",
    "柔性微",
  ],
  材料科学与工程学院: [
    "激光焊接",
    "复合结构",
    "焊接热",
    "金属基",
    "组织结构",
    "表面模型",
    "热管理材料",
  ],
  数学科学学院: ["线性矩阵", "风险模型", "结构优化", "风险指数法", "图模型"],
  物理与天文学院: [
    "光子晶体",
    "调控效应",
    "表面结构",
    "表面态",
    "结构调控",
    "金属光学",
    "光学晶体",
    "表面等离子体",
  ],
  生命科学技术学院: [
    "转录调控",
    "基因测序",
    "假单胞菌",
    "蛋白质蛋白质",
    "信号分子",
    "细胞转录",
    "调控基因",
    "分子调控",
  ],
  生物医学工程学院: [
    "治疗超声",
    "肿瘤模型",
    "肿瘤细胞",
    "血管增强",
    "模态分子",
    "肿瘤分割",
    "模态成像",
    "模态图像",
  ],
  人文学院: [
    "汉语课堂",
    "动词性",
    "汉语教材",
    "汉语教学",
    "语义特征",
    "文化教学",
  ],
  化学化工学院: ["全球变暖", "冰期预测"],
  安泰经济与管理学院: [
    "风险模型",
    "营业策略",
    "成本分析",
    "市场分析",
    "转型升级",
  ],
  国际与公共事务学院: [
    "考试翻译",
    "叙事理论",
    "译本分析",
    "中国政治",
    "话语意义",
    "文本翻译",
  ],
  外国语学院: [
    "译本分析",
    "文本翻译",
    "中国政治",
    "考试翻译",
    "叙事理论",
    "话语意义",
  ],
  农业与生物学院: [
    "蛋白表达",
    "酶活性",
    "植物微生物",
    "土壤酶活性",
    "代谢酶",
    "生物活性",
    "代谢酶基因",
    "菌酶",
  ],
  环境科学与工程学院: [
    "水库系统",
    "硝化电子",
    "有机污染物降解",
    "水氧化",
    "微生物降解",
    "污泥降解",
    "水处理",
    "氧化还原",
  ],
  药学院: [
    "抗原抗体",
    "肿瘤抗原",
    "抗体结构",
    "分子药物",
    "结构控制",
    "质量分析",
  ],
  凯原法学院: ["公司利益", "法律保护", "责任制度", "协议制度", "法律制度"],
  新闻传播学: ["文化企业", "电影传播", "市场分析", "网络社交媒体", "媒介传播"],
  "电子信息与电气工程学院(微电子学院)": ["效应退化", "测试系统"],
  马克思主义学院: [
    "中国特色社会主义文化",
    "共享发展理念",
    "中国发展",
    "治理政策",
    "治理理念",
    "知识传播",
  ],
  体育系: ["睡眠质量", "转换功能", "行走锻炼", "体力活动"],
  "上海交大-巴黎高科卓越工程师学院": ["检测系统", "优化算法", "驱动移动"],
  "上海交大-南加州大学文化创意产业学院": [
    "传播策略",
    "受众研究",
    "形象传播",
    "营销传播",
    "国际工业",
    "广告传播",
  ],
  塑性成形技术与装备研究院: [
    "特征集成",
    "应变路径",
    "路径加载",
    "渐进成形",
    "成形工艺",
    "应变加载",
    "微成形",
    "热变形",
  ],
  微纳科学技术研究院: [
    "rdl铜",
    "热机械可靠性",
    "原位tsv铜",
    "tsv转接",
    "硅通孔",
    "微观结构",
    "高密度封装",
  ],
  高等教育研究院: [
    "学术奖项",
    "奖项评价",
    "体育文化",
    "学生发展",
    "组织理论",
    "评价政策",
    "学科文化",
  ],
  中美物流研究院: [
    "单策略",
    "系统弹性",
    "路径优化",
    "路径规划",
    "能力评价",
    "定价策略",
    "物流模式",
    "平台定价",
  ],
  国际教育学院: [],
  上海交大密西根学院: [
    "火焰面",
    "透镜成像",
    "表面透镜",
    "直流直流",
    "手术机器人系统",
    "热界面材料",
    "手术机器人",
    "机器人系统",
  ],
  上海高级金融学院: [
    "效应模型",
    "风险模型",
    "企业资产",
    "市场效应",
    "并购金融",
  ],
  航空航天学院: [
    "噪声模型",
    "结构优化",
    "图像融合",
    "跟踪控制",
    "卫星系统",
    "状态空间",
  ],
  系统生物医学研究院: ["蛋白质", "肿瘤细胞"],
  人文艺术研究院: [
    "移动媒体",
    "媒介效果",
    "网络热点事件",
    "消费者评价",
    "传播行为",
    "批评性话语分析",
  ],
  设计学院: [
    "体验设计",
    "信息服务设计",
    "用户体验",
    "服务设计",
    "设计方法",
    "视觉勘察",
  ],
};
export default data;
