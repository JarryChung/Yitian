Function.prototype.vCall = function (ctx) {
  ctx = ctx || window

  var key = new Date().getTime().toString()
  ctx[key] = this

  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('ctx[key](' + args + ')')

  delete ctx[key]
  return result
}

Function.prototype.vApply = function (ctx, list = []) {
  ctx = ctx || window

  var key = new Date().getTime().toString()
  ctx[key] = this

  var args = []
  for (var i = 0; i < list.length; i++) {
    args.push('list[' + i + ']')
  }

  var result = eval('ctx[key](' + args + ')')

  delete ctx[key]
  return result
}

Function.prototype.vBind = function (ctx) {
  ctx = ctx || window

  const _self = this
  var bindArgs = Array.prototype.slice.call(arguments, 1)

  function NOP () {}
  function wrap () {
    var args = Array.prototype.slice.call(arguments)
    ctx = this instanceof NOP ? this : ctx
    return _self.apply(ctx, bindArgs.concat(args))
  }

  NOP.prototype = this.prototype
  wrap.prototype = new NOP()
  return wrap
}
