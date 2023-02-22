const set = new Set([1]);

// 这里是和语言规范有关，当一个属性被删除，但是又被添加进入一个集合时，forEach函数可以读取到新添加的属性
set.forEach( item => {
  set.delete(1);
  set.add(1);
  console.log('遍历中');
})