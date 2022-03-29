function myNew() {
	const obj = {}
	const Con = [].shift.call(arguments)
	obj.__proto__ = Con.prototype
	const res = Con.apply(obj, arguments)
	return typeof res === 'object' ? res : obj
}

function Person(name) {
	this.name = name || 'coolb'
}

Person.prototype.getName =  function getName() {
	return 'getmyname' + this.name
}

const mn = myNew(Person, 'xxx')
console.log(mn.name)

console.log(mn.getName())

const nmn = new Person('aaa')

console.log(nmn.getName())
