/**
 * 绘制图标
 * @param {number} size 图表尺寸大小
 * @param {string} iconId 图标需要放到的div的id标识
 * @param {boolean} interactionMouse 图标是否添加鼠标交互
 * @param {boolean} animationAuto 图标是否添加鼠标交互
 */
function drawIcon(size, iconId, interactionMouse, animationAuto) {
    const
        width = size,
        height = size;

    const svg = d3.select(`#${iconId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

    const circleCx = width / 2;
    const circleCy = height / 2;

    const layer1Cnt = 10; //10 layer1线段的条数，参考值：width=300, layer1Cnt=10
    const layer2Cnt = 15; //15 layer2线段的条数，参考值：width=300, layer2Cnt=15
    const layer3Cnt = 20; //20 layer3线段的条数，参考值：width=300, layer3Cnt=20
    const line_ratio = 0.5; //line长度系数
    const layer1Radius = Math.round(size / 7.5); //15 layer1 半径，参考值：width=300, layer1Radius=40
    const layer2Radius = Math.round(size / 5); //25  layer2 半径，参考值：width=300, layer2Radius=60
    const layer3Radius = Math.round(size / 3.75); //35  layer3 半径，参考值：width=300, layer2Radius=78
    const layer1Radius_ratio = 1.15; //layer1宽半径和短半径比值
    const layer2Radius_ratio = 1.1; //layer2宽半径和短半径比值
    const layer3Radius_ratio = 1.09; //layer3宽半径和短半径比值
    const strokeLineWid = (size / 35); //线段粗细，参考值：width=300, strokeLineWid=8
    const animationAngleOffset = 20; //进入动画旋转的角度

    // 线段收缩函数
    function linesClose() {
        //第一层线段动画
        d3.selectAll(".layer1Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer1Radius + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer1Radius}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer1Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer1Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .duration(1000);

        //第二层线段动画
        d3.selectAll(".layer2Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer2Radius}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer2Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(250)
            .duration(1000)

        //第三层线段动画
        d3.selectAll(".layer3Line")
            .transition()
            .attr('d', (d) => {
                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer3Radius}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer3Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(500)
            .duration(1000)
    }

    // 线段扩张函数
    function lineOpen() {
        //第一层线段动画
        d3.selectAll(".layer1Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer1Radius * layer1Radius_ratio + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer1Radius * layer1Radius_ratio}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer1Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer1Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .duration(1000);

        //第二层线段动画
        d3.selectAll(".layer2Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer2Radius * layer2Radius_ratio + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer2Radius * layer2Radius_ratio}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer2Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(250)
            .duration(1000)

        //第三层线段动画
        d3.selectAll(".layer3Line")
            .transition()
            .attr('d', (d) => {
                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer3Radius * layer3Radius_ratio + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer3Radius * layer3Radius_ratio}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer3Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(500)
            .duration(1000)
    }

    // 添加鼠标交互
    function addMouseInteraction() {
        //圆形交互范围判定
        svg.append("circle")
            .attr("cx", `${circleCx}px`)
            .attr("cy", `${circleCy}px`)
            .attr("r", `${layer3Radius * layer3Radius_ratio}px`)
            .attr("fill", "rgba(0,0,0,0)") //需要填色，如果是“none”交互触发不了
            .on("mouseover", () => {
                linesClose();
            })
            .on("mouseleave", () => {
                lineOpen();
            })
    }

    function autoAnimClose() {
        //第一层线段动画
        d3.selectAll(".layer1Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer1Radius + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer1Radius}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer1Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer1Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(3000)
            .duration(700)
            .end() //第一个合上之后就马上调用张开的函数（这样动画更灵动）；张开结束后又调用合上的函数，相当于循环了
            .then(()=>{
                autoAnimOpen()
            });

        //第二层线段动画
        d3.selectAll(".layer2Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer2Radius}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer2Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(3300)
            .duration(700);

        //第三层线段动画
        d3.selectAll(".layer3Line")
            .transition()
            .attr('d', (d) => {
                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer3Radius}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer3Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(3600)
            .duration(700)
            
    }

    function autoAnimOpen() {
        //第一层线段动画
        d3.selectAll(".layer1Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer1Radius * layer1Radius_ratio + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer1Radius * layer1Radius_ratio}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer1Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer1Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(100)
            .duration(1000);

        //第二层线段动画
        d3.selectAll(".layer2Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer2Radius * layer2Radius_ratio + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer2Radius * layer2Radius_ratio}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer2Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(400)
            .duration(1000)

        //第三层线段动画
        d3.selectAll(".layer3Line")
            .transition()
            .attr('d', (d) => {
                return `
                    M${Math.sin(d.startAng * (Math.PI / 180)) * layer3Radius * layer3Radius_ratio + circleCx},
                    ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer3Radius * layer3Radius_ratio}
                    L${Math.sin(d.endAng * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer3Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .ease(d3.easePoly)
            .delay(700)
            .duration(1000)
            .end() //最后一个合上之后，调用张开的函数；张开结束后又调用合上的函数，相当于循环了
            .then(()=>{
                autoAnimClose()
            })
    }


    //绘制第一层线段 + 进场动画
    {
        for (let i = 0; i < layer1Cnt; i++) {

            // Math.cos(360/layer1Cnt*(i-1)* (Math.PI/180))+circleCx
            svg.append("path").datum(
                {
                    startAng: 360 / layer1Cnt * i,
                    endAng: 360 / layer1Cnt * i + 360 / layer1Cnt * line_ratio
                }
            )
                .attr('d', (d) => {
                    return `
                            M${Math.sin((d.startAng - animationAngleOffset) * (Math.PI / 180)) * layer1Radius + circleCx},
                            ${circleCy - Math.cos((d.startAng - animationAngleOffset) * (Math.PI / 180)) * layer1Radius}
                            L${Math.sin((d.endAng - animationAngleOffset) * (Math.PI / 180)) * layer1Radius + circleCx},
                            ${circleCy - Math.cos((d.endAng - animationAngleOffset) * (Math.PI / 180)) * layer1Radius}
                        `
                })
                .attr("class", "layer1Line")
                .attr("stroke", "#030303")
                .attr("stroke-width", strokeLineWid)
                .attr("fill", "none")
                .attr("stroke-linecap", "round")
                .attr("opacity", "0")

        }
        //添加进场动画
        d3.selectAll(".layer1Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                        M${Math.sin(d.startAng * (Math.PI / 180)) * layer1Radius * layer1Radius_ratio + circleCx},
                        ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer1Radius * layer1Radius_ratio}
                        L${Math.sin(d.endAng * (Math.PI / 180)) * layer1Radius + circleCx},
                        ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer1Radius}
                    `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .attr("opacity", "0.8")
            .ease(d3.easePoly)
            .duration(1000)

    }

    //绘制第二层线段 + 进场动画
    {
        //绘制第二层线段
        for (let i = 0; i < layer2Cnt; i++) {

            // Math.cos(360/layer1Cnt*(i-1)* (Math.PI/180))+circleCx
            svg.append("path").datum(
                {
                    startAng: 360 / layer2Cnt * i,
                    endAng: 360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio
                }
            )
                .attr('d', (d) => {
                    return `
                    M${Math.sin((d.startAng - animationAngleOffset) * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos((d.startAng - animationAngleOffset) * (Math.PI / 180)) * layer2Radius}
                    L${Math.sin((d.endAng - animationAngleOffset) * (Math.PI / 180)) * layer2Radius + circleCx},
                    ${circleCy - Math.cos((d.endAng - animationAngleOffset) * (Math.PI / 180)) * layer2Radius}
                `
                })
                .attr("class", "layer2Line")
                .attr("stroke", "#030303")
                .attr("stroke-width", strokeLineWid)
                .attr("fill", "none")
                .attr("stroke-linecap", "round")
                .attr("opacity", "0")
        }
        //添加进场动画
        d3.selectAll(".layer2Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                M${Math.sin(d.startAng * (Math.PI / 180)) * layer2Radius * layer2Radius_ratio + circleCx},
                ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer2Radius * layer2Radius_ratio}
                L${Math.sin(d.endAng * (Math.PI / 180)) * layer2Radius + circleCx},
                ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer2Radius}
            `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .attr("opacity", "0.6")
            .ease(d3.easePoly)
            .delay(250)
            .duration(1000)
    }

    //绘制第三层线段 + 进场动画
    {
        //绘制第三层线段
        for (let i = 0; i < layer3Cnt; i++) {

            // Math.cos(360/layer1Cnt*(i-1)* (Math.PI/180))+circleCx
            svg.append("path").datum(
                {
                    startAng: 360 / layer3Cnt * i,
                    endAng: 360 / layer3Cnt * i + 360 / layer3Cnt * line_ratio
                }
            )
                .attr('d', (d) => {
                    return `
                    M${Math.sin((d.startAng - animationAngleOffset) * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos((d.startAng - animationAngleOffset) * (Math.PI / 180)) * layer3Radius}
                    L${Math.sin((d.endAng - animationAngleOffset) * (Math.PI / 180)) * layer3Radius + circleCx},
                    ${circleCy - Math.cos((d.endAng - animationAngleOffset) * (Math.PI / 180)) * layer3Radius}
                `
                })
                .attr("class", "layer3Line")
                .attr("stroke", "#030303")
                .attr("stroke-width", strokeLineWid)
                .attr("fill", "none")
                .attr("stroke-linecap", "round")
                .attr("opacity", "0")

        }
        //进场动画
        d3.selectAll(".layer3Line")
            .transition()
            .attr('d', (d) => {
                //x: Math.sin((360 / layer2Cnt * i + 360 / layer2Cnt * line_ratio) * (Math.PI / 180)) * layer2Radius + circleCx,

                return `
                M${Math.sin(d.startAng * (Math.PI / 180)) * layer3Radius * layer3Radius_ratio + circleCx},
                ${circleCy - Math.cos(d.startAng * (Math.PI / 180)) * layer3Radius * layer3Radius_ratio}
                L${Math.sin(d.endAng * (Math.PI / 180)) * layer3Radius + circleCx},
                ${circleCy - Math.cos(d.endAng * (Math.PI / 180)) * layer3Radius}
            `
                // return `M${(d[0].x- circleCx)*layer1Radius_ratio+circleCx},${(d[0].y-circleCy)*layer1Radius_ratio+circleCy}L${d[1].x},${d[1].y}`;
            })
            .attr("opacity", "0.4")
            .ease(d3.easePoly)
            .delay(500)
            .duration(1000)
            .end()
            .then(() => {
                //.end().then()语法用于在transition结束之后执行语句
                // 进场动画加载完后再调用鼠标交互函数，不然可能会在line上同时挂载两个transition，会冲突
                
                //进场动画结束，绑定鼠标交互事件
                if(interactionMouse)
                {
                    addMouseInteraction();
                }

                //进场动画结束，绑定自动动画事件
                if(animationAuto)
                {
                    autoAnimClose();
                }

            });
    }

}










