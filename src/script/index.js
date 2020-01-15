class Render {
    constructor() {
        //点击切换男女士专区的元素
        this.photoone = $('.photo .manul');
        this.phototwo = $('.photo .womanul');
        this.buttomman = $('.manorwoman ul li:nth-child(1)');
        this.buttomwoman = $('.manorwoman ul li:nth-child(2)');

        //      top部分的元素
        this.ul = $('.topleft ul');
        this.none = $('#none');

        //       回到顶部按钮元素
        this.buttomtop = $('#louti li:last-child');

        //         轮播图需要的元素
        this.wangleft = $('.wangleft');
        this.wangright = $('.wangright');
        this.lunboone = $('.lunboone');
        this.lunbotwo = $('.lunbotwo');
        this.autoplay = null;

        //        轮播渲染需要的元素


    }

    //                  点击切换男女士专区
    init() {
        this.buttomman.on('click', () => {
            this.photoone.css('display', 'block');
            this.phototwo.css('display', 'none')
        })

        this.buttomwoman.on('click', () => {
            this.photoone.css('display', 'none');
            this.phototwo.css('display', 'block')
        })

        //       调用效果
        this.xuanran();
        this.inittop();
        this.backtop();
        this.lunbo();
        this.lunborender();
    }

    //                男女士区域数据渲染
    xuanran() {
        $.ajax({
            url: 'http://10.31.152.61/TheNorthFace/php/conn.php',
            dataType: 'json'
        }).done((d) => {
            // console.log(d);
            let manstr = '';
            $.each(d, (index, value) => {
                // console.log(value.sid);
                manstr += `
                    <li >
                        <a href="http://10.31.152.61/TheNorthFace/src/detail.html?sid=${value.sid}">
                            <img src="${value.url}" alt="">
                        </a>
                    </li>
                    `;
            })
            this.photoone.html(manstr);
        });

        $.ajax({
            url: 'http://10.31.152.61/TheNorthFace/php/renderwoman.php',
            dataType: 'json'
        }).done((d) => {
            // console.log(d);
            let womanstr = '';
            $.each(d, (index, value) => {
                // console.log(value);
                womanstr += `
                    <li >
                        <a href="http://10.31.152.61/TheNorthFace/src/detail.html?sid=${value.sid}">
                            <img src="${value.url}" alt=" ">
                        </a>
                    </li>
                    `;
            })
            this.phototwo.html(womanstr);
        });
    }

    //                    二级菜单
    inittop() {
            this.ul.on('mousemove', () => {
                this.none.css('display', 'block');
                this.none.on('mousemove', () => {
                    this.none.css('display', 'block');
                })
                this.none.on('mouseout', () => {
                    this.none.css('display', 'none');
                })
            })
            this.ul.on('mouseout', () => {
                this.none.css('display', 'none');
            })
            this.topmove()
        }
        //                 顶部悬浮
    topmove() {
        $(window).on('scroll', function() {
            let top = $(window).scrollTop();
            if (top !== 0) {
                $('#logodiv').css('top', top);
            } else if (top < 42) {
                $('#logodiv').css('top', 0);
            }
        })


    }

    //                  回到顶部效果
    backtop() {
        this.buttomtop.on('click', () => {
            let topheight = $(window).scrollTop();
            if (topheight > 0) {
                topheight = 0;
                $(window).scrollTop(topheight);
            }
        })

    }

    //                 轮播图
    lunbo() {
        let num = 0;
        //                  右键切换事件
        this.wangright.on('click', () => {
            num++;
            // console.log(num);
            if (num % 2 == 0) {
                this.lunbotwo.css('display', 'none');
                this.lunboone.css('display', 'block');
            } else {
                this.lunbotwo.css('display', 'block');
                this.lunboone.css('display', 'none');
            }
        })



        //                  左键切换事件
        this.wangleft.on('click', () => {
            num--;
            // console.log(num);
            if (num % 2 == 0) {
                this.lunbotwo.css('display', 'none');
                this.lunboone.css('display', 'block');

            } else {
                this.lunbotwo.css('display', 'block');
                this.lunboone.css('display', 'none');
            }
        })

        //                 自动轮播事件
        setInterval(() => {
            num++;
            if (num % 2 == 0) {
                this.lunbotwo.css('display', 'none');
                this.lunboone.css('display', 'block');
            } else {
                this.lunbotwo.css('display', 'block');
                this.lunboone.css('display', 'none');
            }
        }, 2000)

    }


    //                轮播图渲染
    lunborender() {
        //              第一部分的渲染
        $.ajax({
            url: 'http://10.31.152.61/TheNorthFace/php/lunboxuanran.php',
            dataType: 'json'
        }).done((d) => {
            // console.log(d);
            let lunbostr = '';
            $.each(d, (index, value) => {
                lunbostr += `
                <li>
                    <a href="http://10.31.152.61/TheNorthFace/src/detail.html">
                        <img src="${value.url}" alt="">
                        <h2>${value.title}</h2>
                        <div>
                            <span>${value.price}</span>
                            <s>￥${value.decribt}</s>
                        </div>
                    </a>
                </li>
                `;
            })

            this.lunboone.html(lunbostr);
        })

        //              第二部分的渲染
        $.ajax({
            url: 'http://10.31.152.61/TheNorthFace/php/lunbowoman.php',
            dataType: 'json'
        }).done((d) => {
            // console.log(d);
            let lunbostr = '';
            $.each(d, (index, value) => {
                lunbostr += `
                <li>
                    <a href="http://10.31.152.61/TheNorthFace/src/detail.html">
                        <img src="${value.url}" alt="">
                        <h2>${value.title}</h2>
                        <div>
                            <span>${value.price}</span>
                            <s>￥${value.decribt}</s>
                        </div>
                    </a>
                </li>
                `;
            })
            this.lunbotwo.html(lunbostr);
        })
    }
}

export {
    Render
}