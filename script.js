
class Bezier {
	constructor(points) {
		this.points = points;
	}
	eq(a, b) {
		return a === b;
	}
	lt(a, b) {
		return a < b;
	}
	ltGt(a, b) {
		return a <= b;
	}
	doNtimes(n, fx, i = 0) {
		return (i < n) ? [fx(i), ...doNtimes(n, fx, i + 1)] : [];
	}
	fromAtoB(a, b, step = 1, eq = true, i = 0) {
		return (((eq) ? ltEq : lt)(a + i, b)) ? [a + i, ...fromAtoB(a, b, step, eq, i + step)] : [];
	}
	bezierLooper(proportion) {
		if (points.length === 1) return;
		const dComponents = [];
		this.doNtimes(points.length - 1, i => {
			const x = (this.points[i + 1][0] - this.points[i][0]) * proportion + this.points[i][0];
			const y = (this.points[i + 1][1] - this.points[i][1]) * proportion + this.points[i][1];
			dComponents.push([x, y]);
		});
		if (this.points.length === 2) {
			result[0] = dComponents[0][0];
			result[1] = dComponents[0][1];
		}
		this.bezierLooper(dComponents, proportion, result);
		return this.result;
	}
	calc(step) {
		const result = looper(fromAtoB(0, 1, step), i => {
			const answer = [];
			bezierLooper(i);
			return answer;
		});
		return result;
	}
}

