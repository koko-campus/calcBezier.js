


class Bezier {
	lt = (a, b) => a < b;
	ltEq = (a, b) => a <= b;
	doNtimes = (n, fx, i = 0) => (i < n) ? [fx(i), ...this.doNtimes(n, fx, i + 1)] : [];
	looper = ([a, ...b], fx, i = 0) => (a !== undefined) ? [fx(a, i), ...this.looper(b, fx, i + 1)] : [];
	fromAtoB = (a, b, step = 1, eq = true, i = 0) => (((eq) ? this.ltEq : this.lt)(a + i, b)) ? [a + i, ...this.fromAtoB(a, b, step, eq, i + step)] : [];

	bezierPoints; // 制御点を格納

	constructor(bezierPoints) {
		this.bezierPoints = bezierPoints; // コンストラクタでは制御点を取得
	}

	// 再帰関数
	// 各制御点の2点をつなぐ線分から指定した割合の点を取得
	// 当該点を対象に2点をつなぐ線分から指定した割合の点を取得
	// 上記作業を点が1つになるまで再帰的に実行
	// 点が2つに絞られた際の、当該点を結ぶ線分を指定した割合で分割する点が求めたい座標
	recursiveMain(points, proportion, result) {
		if (points.length === 1) return;
		const dComponents = [];
		// 各点を結ぶ線分の指定した割合で分割する座標を取得
		this.doNtimes(points.length - 1, i => {
			const x = (points[i + 1][0] - points[i][0]) * proportion + points[i][0];
			const y = (points[i + 1][1] - points[i][1]) * proportion + points[i][1];
			dComponents.push([x, y]);
		});
		if (points.length === 2) {
			result[0] = dComponents[0][0];
			result[1] = dComponents[0][1];
		}
		this.recursiveMain(dComponents, proportion, result);
	}
	
	calc(divide) {
		const range = this.fromAtoB(0, 1, 1 / divide);
		range.shift();
		range.pop();
		const result = [[0, 0], ...this.looper(range, i => {
			const answer = [];
			this.recursiveMain(this.bezierPoints, i, answer);
			return answer;
		}), [1, 1]];
		return result;
	}
}



