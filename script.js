


class Bezier {
	eq = (a, b) => a === b;
	ne = (a, b) => a !== b;
	gt = (a, b) => a > b;
	gtEq = (a, b) => a >= b;
	lt = (a, b) => a < b;
	ltEq = (a, b) => a <= b;
	doNtimes = (n, fx, i = 0) => (i < n) ? [fx(i), ...this.doNtimes(n, fx, i + 1)] : [];
	looper = ([a, ...b], fx, i = 0) => (a !== undefined) ? [fx(a, i), ...this.looper(b, fx, i + 1)] : [];
	fromAtoB = (a, b, step = 1, eq = true, i = 0) => (((eq) ? this.ltEq : this.lt)(a + i, b)) ? [a + i, ...this.fromAtoB(a, b, step, eq, i + step)] : [];
	bezierPoints;

	constructor(bezierPoints) {
		this.bezierPoints = bezierPoints;
	}

	recursiveMain(points, proportion, result) {
		if (points.length === 1) return;
		const dComponents = [];
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
		console.log(range);
		const result = [[0, 0], ...this.looper(range, i => {
			const answer = [];
			this.recursiveMain(this.bezierPoints, i, answer);
			return answer;
		}), [1, 1]];
		return result;
	}
}



