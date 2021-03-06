/* PrismJS 1.16.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+c+csharp+cpp+markup-templating+php&plugins=line-highlight+line-numbers+wpd+keep-markup */
var _self = 'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = (function (g) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      a = 0,
      C = {
        manual: g.Prism && g.Prism.manual,
        disableWorkerMessageHandler: g.Prism && g.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (e) {
            return e instanceof M
              ? new M(e.type, C.util.encode(e.content), e.alias)
              : Array.isArray(e)
              ? e.map(C.util.encode)
              : e
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/\u00a0/g, ' ');
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return e.__id || Object.defineProperty(e, '__id', { value: ++a }), e.__id;
          },
          clone: function t(e, n) {
            var r,
              a,
              i = C.util.type(e);
            switch (((n = n || {}), i)) {
              case 'Object':
                if (((a = C.util.objId(e)), n[a])) return n[a];
                for (var l in ((r = {}), (n[a] = r), e)) e.hasOwnProperty(l) && (r[l] = t(e[l], n));
                return r;
              case 'Array':
                return (
                  (a = C.util.objId(e)),
                  n[a]
                    ? n[a]
                    : ((r = []),
                      (n[a] = r),
                      e.forEach(function (e, a) {
                        r[a] = t(e, n);
                      }),
                      r)
                );
              default:
                return e;
            }
          },
        },
        languages: {
          extend: function (e, a) {
            var t = C.util.clone(C.languages[e]);
            for (var n in a) t[n] = a[n];
            return t;
          },
          insertBefore: function (t, e, a, n) {
            var r = (n = n || C.languages)[t],
              i = {};
            for (var l in r)
              if (r.hasOwnProperty(l)) {
                if (l == e) for (var o in a) a.hasOwnProperty(o) && (i[o] = a[o]);
                a.hasOwnProperty(l) || (i[l] = r[l]);
              }
            var s = n[t];
            return (
              (n[t] = i),
              C.languages.DFS(C.languages, function (e, a) {
                a === s && e != t && (this[e] = i);
              }),
              i
            );
          },
          DFS: function e(a, t, n, r) {
            r = r || {};
            var i = C.util.objId;
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                t.call(a, l, a[l], n || l);
                var o = a[l],
                  s = C.util.type(o);
                'Object' !== s || r[i(o)] ? 'Array' !== s || r[i(o)] || ((r[i(o)] = !0), e(o, t, l, r)) : ((r[i(o)] = !0), e(o, t, null, r));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, a) {
          C.highlightAllUnder(document, e, a);
        },
        highlightAllUnder: function (e, a, t) {
          var n = { callback: t, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
          C.hooks.run('before-highlightall', n);
          for (var r, i = n.elements || e.querySelectorAll(n.selector), l = 0; (r = i[l++]); ) C.highlightElement(r, !0 === a, n.callback);
        },
        highlightElement: function (e, a, t) {
          for (var n, r, i = e; i && !c.test(i.className); ) i = i.parentNode;
          i && ((n = (i.className.match(c) || [, ''])[1].toLowerCase()), (r = C.languages[n])),
            (e.className = e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + n),
            e.parentNode && ((i = e.parentNode), /pre/i.test(i.nodeName) && (i.className = i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + n));
          var l = { element: e, language: n, grammar: r, code: e.textContent },
            o = function (e) {
              (l.highlightedCode = e), C.hooks.run('before-insert', l), (l.element.innerHTML = l.highlightedCode), C.hooks.run('after-highlight', l), C.hooks.run('complete', l), t && t.call(l.element);
            };
          if ((C.hooks.run('before-sanity-check', l), l.code))
            if ((C.hooks.run('before-highlight', l), l.grammar))
              if (a && g.Worker) {
                var s = new Worker(C.filename);
                (s.onmessage = function (e) {
                  o(e.data);
                }),
                  s.postMessage(JSON.stringify({ language: l.language, code: l.code, immediateClose: !0 }));
              } else o(C.highlight(l.code, l.grammar, l.language));
            else o(C.util.encode(l.code));
          else C.hooks.run('complete', l);
        },
        highlight: function (e, a, t) {
          var n = { code: e, grammar: a, language: t };
          return C.hooks.run('before-tokenize', n), (n.tokens = C.tokenize(n.code, n.grammar)), C.hooks.run('after-tokenize', n), M.stringify(C.util.encode(n.tokens), n.language);
        },
        matchGrammar: function (e, a, t, n, r, i, l) {
          for (var o in t)
            if (t.hasOwnProperty(o) && t[o]) {
              if (o == l) return;
              var s = t[o];
              s = 'Array' === C.util.type(s) ? s : [s];
              for (var g = 0; g < s.length; ++g) {
                var c = s[g],
                  u = c.inside,
                  h = !!c.lookbehind,
                  f = !!c.greedy,
                  d = 0,
                  m = c.alias;
                if (f && !c.pattern.global) {
                  var p = c.pattern.toString().match(/[imuy]*$/)[0];
                  c.pattern = RegExp(c.pattern.source, p + 'g');
                }
                c = c.pattern || c;
                for (var y = n, v = r; y < a.length; v += a[y].length, ++y) {
                  var k = a[y];
                  if (a.length > e.length) return;
                  if (!(k instanceof M)) {
                    if (f && y != a.length - 1) {
                      if (((c.lastIndex = v), !(x = c.exec(e)))) break;
                      for (var b = x.index + (h ? x[1].length : 0), w = x.index + x[0].length, A = y, P = v, O = a.length; A < O && (P < w || (!a[A].type && !a[A - 1].greedy)); ++A) (P += a[A].length) <= b && (++y, (v = P));
                      if (a[y] instanceof M) continue;
                      (N = A - y), (k = e.slice(v, P)), (x.index -= v);
                    } else {
                      c.lastIndex = 0;
                      var x = c.exec(k),
                        N = 1;
                    }
                    if (x) {
                      h && (d = x[1] ? x[1].length : 0);
                      w = (b = x.index + d) + (x = x[0].slice(d)).length;
                      var j = k.slice(0, b),
                        S = k.slice(w),
                        E = [y, N];
                      j && (++y, (v += j.length), E.push(j));
                      var _ = new M(o, u ? C.tokenize(x, u) : x, m, x, f);
                      if ((E.push(_), S && E.push(S), Array.prototype.splice.apply(a, E), 1 != N && C.matchGrammar(e, a, t, y, v, !0, o), i)) break;
                    } else if (i) break;
                  }
                }
              }
            }
        },
        tokenize: function (e, a) {
          var t = [e],
            n = a.rest;
          if (n) {
            for (var r in n) a[r] = n[r];
            delete a.rest;
          }
          return C.matchGrammar(e, t, a, 0, 0, !1), t;
        },
        hooks: {
          all: {},
          add: function (e, a) {
            var t = C.hooks.all;
            (t[e] = t[e] || []), t[e].push(a);
          },
          run: function (e, a) {
            var t = C.hooks.all[e];
            if (t && t.length) for (var n, r = 0; (n = t[r++]); ) n(a);
          },
        },
        Token: M,
      };
    function M(e, a, t, n, r) {
      (this.type = e), (this.content = a), (this.alias = t), (this.length = 0 | (n || '').length), (this.greedy = !!r);
    }
    if (
      ((g.Prism = C),
      (M.stringify = function (e, a) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e))
          return e
            .map(function (e) {
              return M.stringify(e, a);
            })
            .join('');
        var t = { type: e.type, content: M.stringify(e.content, a), tag: 'span', classes: ['token', e.type], attributes: {}, language: a };
        if (e.alias) {
          var n = Array.isArray(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(t.classes, n);
        }
        C.hooks.run('wrap', t);
        var r = Object.keys(t.attributes)
          .map(function (e) {
            return e + '="' + (t.attributes[e] || '').replace(/"/g, '&quot;') + '"';
          })
          .join(' ');
        return '<' + t.tag + ' class="' + t.classes.join(' ') + '"' + (r ? ' ' + r : '') + '>' + t.content + '</' + t.tag + '>';
      }),
      !g.document)
    )
      return (
        g.addEventListener &&
          (C.disableWorkerMessageHandler ||
            g.addEventListener(
              'message',
              function (e) {
                var a = JSON.parse(e.data),
                  t = a.language,
                  n = a.code,
                  r = a.immediateClose;
                g.postMessage(C.highlight(n, C.languages[t], t)), r && g.close();
              },
              !1
            )),
        C
      );
    var e = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
    return (
      e &&
        ((C.filename = e.src),
        C.manual ||
          e.hasAttribute('data-manual') ||
          ('loading' !== document.readyState ? (window.requestAnimationFrame ? window.requestAnimationFrame(C.highlightAll) : window.setTimeout(C.highlightAll, 16)) : document.addEventListener('DOMContentLoaded', C.highlightAll))),
      C
    );
  })(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
      'attr-value': { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i, inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] } },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  Prism.hooks.add('wrap', function (a) {
    'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      var s = {};
      (s['language-' + e] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: !0, inside: Prism.languages[e] }), (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var n = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } };
      n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var i = {};
      (i[a] = { pattern: RegExp('(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(/__/g, a), 'i'), lookbehind: !0, greedy: !0, inside: n }), Prism.languages.insertBefore('markup', 'cdata', i);
    },
  }),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
!(function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: { pattern: /@[\w-]+?[\s\S]*?(?:;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } },
    url: RegExp('url\\((?:' + e.source + '|.*?)\\)', 'i'),
    selector: RegExp('[^{}\\s](?:[^{};"\']|' + e.source + ')*?(?=\\s*\\{)'),
    string: { pattern: e, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var a = s.languages.markup;
  a &&
    (a.tag.addInlined('style', 'css'),
    s.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: { 'attr-name': { pattern: /^\s*style/i, inside: a.tag.inside }, punctuation: /^\s*=\s*['"]|['"]\s*$/, 'attr-value': { pattern: /.+/i, inside: s.languages.css } },
          alias: 'language-css',
        },
      },
      a.tag
    ));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  'class-name': { pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i, lookbehind: !0, inside: { punctuation: /[.\\]/ } },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [Prism.languages.clike['class-name'], { pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/, lookbehind: !0 }],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
  (Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: { pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/, lookbehind: !0, greedy: !0 },
    'function-variable': { pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/, alias: 'function' },
    parameter: [
      { pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/, lookbehind: !0, inside: Prism.languages.javascript },
      { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: Prism.languages.javascript },
      { pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/, lookbehind: !0, inside: Prism.languages.javascript },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
      greedy: !0,
      inside: { interpolation: { pattern: /\${[^}]+}/, inside: { 'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ },
    },
  }),
  Prism.languages.markup && Prism.languages.markup.tag.addInlined('script', 'javascript'),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.c = Prism.languages.extend('clike', {
  'class-name': { pattern: /(\b(?:enum|struct)\s+)\w+/, lookbehind: !0 },
  keyword:
    /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
  number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
})),
  Prism.languages.insertBefore('c', 'string', {
    macro: {
      pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      alias: 'property',
      inside: {
        string: { pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/, lookbehind: !0 },
        directive: { pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/, lookbehind: !0, alias: 'keyword' },
      },
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
  }),
  delete Prism.languages.c.boolean;
(Prism.languages.csharp = Prism.languages.extend('clike', {
  keyword:
    /\b(?:abstract|add|alias|as|ascending|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|do|double|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|from|get|global|goto|group|if|implicit|in|int|interface|internal|into|is|join|let|lock|long|namespace|new|null|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/,
  string: [
    { pattern: /@("|')(?:\1\1|\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*?\1/, greedy: !0 },
  ],
  'class-name': [
    { pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=\s+\w+)/, inside: { punctuation: /\./ } },
    { pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/, lookbehind: !0, inside: { punctuation: /\./ } },
    { pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/, lookbehind: !0, inside: { punctuation: /\./ } },
    { pattern: /((?:\b(?:class|interface|new)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/, lookbehind: !0, inside: { punctuation: /\./ } },
  ],
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)f?/i,
  operator: />>=?|<<=?|[-=]>|([-+&|?])\1|~|[-+*/%&|^!=<>]=?/,
  punctuation: /\?\.?|::|[{}[\];(),.:]/,
})),
  Prism.languages.insertBefore('csharp', 'class-name', {
    'generic-method': {
      pattern: /\w+\s*<[^>\r\n]+?>\s*(?=\()/,
      inside: { function: /^\w+/, 'class-name': { pattern: /\b[A-Z]\w*(?:\.\w+)*\b/, inside: { punctuation: /\./ } }, keyword: Prism.languages.csharp.keyword, punctuation: /[<>(),.:]/ },
    },
    preprocessor: {
      pattern: /(^\s*)#.*/m,
      lookbehind: !0,
      alias: 'property',
      inside: { directive: { pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/, lookbehind: !0, alias: 'keyword' } },
    },
  }),
  (Prism.languages.dotnet = Prism.languages.csharp);
(Prism.languages.cpp = Prism.languages.extend('c', {
  'class-name': { pattern: /(\b(?:class|enum|struct)\s+)\w+/, lookbehind: !0 },
  keyword:
    /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
  boolean: /\b(?:true|false)\b/,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
})),
  Prism.languages.insertBefore('cpp', 'string', { 'raw-string': { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: 'string', greedy: !0 } });
!(function (h) {
  function v(e, n) {
    return '___' + e.toUpperCase() + n + '___';
  }
  Object.defineProperties((h.languages['markup-templating'] = {}), {
    buildPlaceholders: {
      value: function (a, r, e, o) {
        if (a.language === r) {
          var c = (a.tokenStack = []);
          (a.code = a.code.replace(e, function (e) {
            if ('function' == typeof o && !o(e)) return e;
            for (var n, t = c.length; -1 !== a.code.indexOf((n = v(r, t))); ) ++t;
            return (c[t] = e), n;
          })),
            (a.grammar = h.languages.markup);
        }
      },
    },
    tokenizePlaceholders: {
      value: function (p, k) {
        if (p.language === k && p.tokenStack) {
          p.grammar = h.languages[k];
          var m = 0,
            d = Object.keys(p.tokenStack);
          !(function e(n) {
            for (var t = 0; t < n.length && !(m >= d.length); t++) {
              var a = n[t];
              if ('string' == typeof a || (a.content && 'string' == typeof a.content)) {
                var r = d[m],
                  o = p.tokenStack[r],
                  c = 'string' == typeof a ? a : a.content,
                  i = v(k, r),
                  u = c.indexOf(i);
                if (-1 < u) {
                  ++m;
                  var g = c.substring(0, u),
                    l = new h.Token(k, h.tokenize(o, p.grammar), 'language-' + k, o),
                    s = c.substring(u + i.length),
                    f = [];
                  g && f.push.apply(f, e([g])), f.push(l), s && f.push.apply(f, e([s])), 'string' == typeof a ? n.splice.apply(n, [t, 1].concat(f)) : (a.content = f);
                }
              } else a.content && e(a.content);
            }
            return n;
          })(p.tokens);
        }
      },
    },
  });
})(Prism);
!(function (n) {
  (n.languages.php = n.languages.extend('clike', {
    keyword:
      /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
    boolean: { pattern: /\b(?:false|true)\b/i, alias: 'constant' },
    constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
    comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
  })),
    n.languages.insertBefore('php', 'string', { 'shell-comment': { pattern: /(^|[^\\])#.*/, lookbehind: !0, alias: 'comment' } }),
    n.languages.insertBefore('php', 'comment', { delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: 'important' } }),
    n.languages.insertBefore('php', 'keyword', { variable: /\$+(?:\w+\b|(?={))/i, package: { pattern: /(\\|namespace\s+|use\s+)[\w\\]+/, lookbehind: !0, inside: { punctuation: /\\/ } } }),
    n.languages.insertBefore('php', 'operator', { property: { pattern: /(->)[\w]+/, lookbehind: !0 } });
  var e = { pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/, lookbehind: !0, inside: { rest: n.languages.php } };
  n.languages.insertBefore('php', 'string', {
    'nowdoc-string': { pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/, greedy: !0, alias: 'string', inside: { delimiter: { pattern: /^<<<'[^']+'|[a-z_]\w*;$/i, alias: 'symbol', inside: { punctuation: /^<<<'?|[';]$/ } } } },
    'heredoc-string': {
      pattern: /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
      greedy: !0,
      alias: 'string',
      inside: { delimiter: { pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i, alias: 'symbol', inside: { punctuation: /^<<<"?|[";]$/ } }, interpolation: e },
    },
    'single-quoted-string': { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0, alias: 'string' },
    'double-quoted-string': { pattern: /"(?:\\[\s\S]|[^\\"])*"/, greedy: !0, alias: 'string', inside: { interpolation: e } },
  }),
    delete n.languages.php.string,
    n.hooks.add('before-tokenize', function (e) {
      if (/<\?/.test(e.code)) {
        n.languages['markup-templating'].buildPlaceholders(e, 'php', /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi);
      }
    }),
    n.hooks.add('after-tokenize', function (e) {
      n.languages['markup-templating'].tokenizePlaceholders(e, 'php');
    });
})(Prism);
!(function () {
  if ('undefined' != typeof self && self.Prism && self.document && document.querySelector) {
    var t,
      h = function () {
        if (void 0 === t) {
          var e = document.createElement('div');
          (e.style.fontSize = '13px'), (e.style.lineHeight = '1.5'), (e.style.padding = 0), (e.style.border = 0), (e.innerHTML = '&nbsp;<br />&nbsp;'), document.body.appendChild(e), (t = 38 === e.offsetHeight), document.body.removeChild(e);
        }
        return t;
      },
      l = 0;
    Prism.hooks.add('before-sanity-check', function (e) {
      var t = e.element.parentNode,
        n = t && t.getAttribute('data-line');
      if (t && n && /pre/i.test(t.nodeName)) {
        var i = 0;
        r('.line-highlight', t).forEach(function (e) {
          (i += e.textContent.length), e.parentNode.removeChild(e);
        }),
          i && /^( \n)+$/.test(e.code.slice(-i)) && (e.code = e.code.slice(0, -i));
      }
    }),
      Prism.hooks.add('complete', function e(t) {
        var n = t.element.parentNode,
          i = n && n.getAttribute('data-line');
        if (n && i && /pre/i.test(n.nodeName)) {
          clearTimeout(l);
          var r = Prism.plugins.lineNumbers,
            o = t.plugins && t.plugins.lineNumbers;
          g(n, 'line-numbers') && r && !o ? Prism.hooks.add('line-numbers', e) : (a(n, i), (l = setTimeout(s, 1)));
        }
      }),
      window.addEventListener('hashchange', s),
      window.addEventListener('resize', function () {
        var e = document.querySelectorAll('pre[data-line]');
        Array.prototype.forEach.call(e, function (e) {
          a(e);
        });
      });
  }
  function r(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function g(e, t) {
    return (t = ' ' + t + ' '), -1 < (' ' + e.className + ' ').replace(/[\n\t]/g, ' ').indexOf(t);
  }
  function a(e, t, n) {
    for (
      var i,
        r = (t = 'string' == typeof t ? t : e.getAttribute('data-line')).replace(/\s+/g, '').split(','),
        o = +e.getAttribute('data-line-offset') || 0,
        l = (h() ? parseInt : parseFloat)(getComputedStyle(e).lineHeight),
        a = g(e, 'line-numbers'),
        s = 0;
      (i = r[s++]);

    ) {
      var d = i.split('-'),
        u = +d[0],
        c = +d[1] || u,
        m = e.querySelector('.line-highlight[data-range="' + i + '"]') || document.createElement('div');
      if ((m.setAttribute('aria-hidden', 'true'), m.setAttribute('data-range', i), (m.className = (n || '') + ' line-highlight'), a && Prism.plugins.lineNumbers)) {
        var p = Prism.plugins.lineNumbers.getLine(e, u),
          f = Prism.plugins.lineNumbers.getLine(e, c);
        p && (m.style.top = p.offsetTop + 'px'), f && (m.style.height = f.offsetTop - p.offsetTop + f.offsetHeight + 'px');
      } else m.setAttribute('data-start', u), u < c && m.setAttribute('data-end', c), (m.style.top = (u - o - 1) * l + 'px'), (m.textContent = new Array(c - u + 2).join(' \n'));
      a ? e.appendChild(m) : (e.querySelector('code') || e).appendChild(m);
    }
  }
  function s() {
    var e = location.hash.slice(1);
    r('.temporary.line-highlight').forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    var t = (e.match(/\.([\d,-]+)$/) || [, ''])[1];
    if (t && !document.getElementById(e)) {
      var n = e.slice(0, e.lastIndexOf('.')),
        i = document.getElementById(n);
      i && (i.hasAttribute('data-line') || i.setAttribute('data-line', ''), a(i, t, 'temporary '), document.querySelector('.temporary.line-highlight').scrollIntoView());
    }
  }
})();
!(function () {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var l = 'line-numbers',
      c = /\n(?!$)/g,
      m = function (e) {
        var t = a(e)['white-space'];
        if ('pre-wrap' === t || 'pre-line' === t) {
          var n = e.querySelector('code'),
            r = e.querySelector('.line-numbers-rows'),
            s = e.querySelector('.line-numbers-sizer'),
            i = n.textContent.split(c);
          s || (((s = document.createElement('span')).className = 'line-numbers-sizer'), n.appendChild(s)),
            (s.style.display = 'block'),
            i.forEach(function (e, t) {
              s.textContent = e || '\n';
              var n = s.getBoundingClientRect().height;
              r.children[t].style.height = n + 'px';
            }),
            (s.textContent = ''),
            (s.style.display = 'none');
        }
      },
      a = function (e) {
        return e ? (window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null) : null;
      };
    window.addEventListener('resize', function () {
      Array.prototype.forEach.call(document.querySelectorAll('pre.' + l), m);
    }),
      Prism.hooks.add('complete', function (e) {
        if (e.code) {
          var t = e.element,
            n = t.parentNode;
          if (n && /pre/i.test(n.nodeName) && !t.querySelector('.line-numbers-rows')) {
            for (var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t; i; i = i.parentNode)
              if (s.test(i.className)) {
                r = !0;
                break;
              }
            if (r) {
              (t.className = t.className.replace(s, ' ')), s.test(n.className) || (n.className += ' line-numbers');
              var l,
                a = e.code.match(c),
                o = a ? a.length + 1 : 1,
                u = new Array(o + 1).join('<span></span>');
              (l = document.createElement('span')).setAttribute('aria-hidden', 'true'),
                (l.className = 'line-numbers-rows'),
                (l.innerHTML = u),
                n.hasAttribute('data-start') && (n.style.counterReset = 'linenumber ' + (parseInt(n.getAttribute('data-start'), 10) - 1)),
                e.element.appendChild(l),
                m(n),
                Prism.hooks.run('line-numbers', e);
            }
          }
        }
      }),
      Prism.hooks.add('line-numbers', function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function (e, t) {
          if ('PRE' === e.tagName && e.classList.contains(l)) {
            var n = e.querySelector('.line-numbers-rows'),
              r = parseInt(e.getAttribute('data-start'), 10) || 1,
              s = r + (n.children.length - 1);
            t < r && (t = r), s < t && (t = s);
            var i = t - r;
            return n.children[i];
          }
        },
      });
  }
})();
!(function () {
  if (('undefined' == typeof self || self.Prism) && ('undefined' == typeof global || global.Prism)) {
    if (
      (Prism.languages.css &&
        (Prism.languages.css.selector.pattern
          ? ((Prism.languages.css.selector.inside['pseudo-class'] = /:[\w-]+/), (Prism.languages.css.selector.inside['pseudo-element'] = /::[\w-]+/))
          : (Prism.languages.css.selector = { pattern: Prism.languages.css.selector, inside: { 'pseudo-class': /:[\w-]+/, 'pseudo-element': /::[\w-]+/ } })),
      Prism.languages.markup)
    ) {
      Prism.languages.markup.tag.inside.tag.inside['tag-id'] = /[\w-]+/;
      var s = {
        HTML: {
          a: 1,
          abbr: 1,
          acronym: 1,
          b: 1,
          basefont: 1,
          bdo: 1,
          big: 1,
          blink: 1,
          cite: 1,
          code: 1,
          dfn: 1,
          em: 1,
          kbd: 1,
          i: 1,
          rp: 1,
          rt: 1,
          ruby: 1,
          s: 1,
          samp: 1,
          small: 1,
          spacer: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          time: 1,
          tt: 1,
          u: 1,
          var: 1,
          wbr: 1,
          noframes: 1,
          summary: 1,
          command: 1,
          dt: 1,
          dd: 1,
          figure: 1,
          figcaption: 1,
          center: 1,
          section: 1,
          nav: 1,
          article: 1,
          aside: 1,
          hgroup: 1,
          header: 1,
          footer: 1,
          address: 1,
          noscript: 1,
          isIndex: 1,
          main: 1,
          mark: 1,
          marquee: 1,
          meter: 1,
          menu: 1,
        },
        SVG: {
          animateColor: 1,
          animateMotion: 1,
          animateTransform: 1,
          glyph: 1,
          feBlend: 1,
          feColorMatrix: 1,
          feComponentTransfer: 1,
          feFuncR: 1,
          feFuncG: 1,
          feFuncB: 1,
          feFuncA: 1,
          feComposite: 1,
          feConvolveMatrix: 1,
          feDiffuseLighting: 1,
          feDisplacementMap: 1,
          feFlood: 1,
          feGaussianBlur: 1,
          feImage: 1,
          feMerge: 1,
          feMergeNode: 1,
          feMorphology: 1,
          feOffset: 1,
          feSpecularLighting: 1,
          feTile: 1,
          feTurbulence: 1,
          feDistantLight: 1,
          fePointLight: 1,
          feSpotLight: 1,
          linearGradient: 1,
          radialGradient: 1,
          altGlyph: 1,
          textPath: 1,
          tref: 1,
          altglyph: 1,
          textpath: 1,
          altglyphdef: 1,
          altglyphitem: 1,
          clipPath: 1,
          'color-profile': 1,
          cursor: 1,
          'font-face': 1,
          'font-face-format': 1,
          'font-face-name': 1,
          'font-face-src': 1,
          'font-face-uri': 1,
          foreignObject: 1,
          glyphRef: 1,
          hkern: 1,
          vkern: 1,
        },
        MathML: {},
      };
    }
    var a;
    Prism.hooks.add('wrap', function (e) {
      if (
        ('tag-id' == e.type ||
          ('property' == e.type && 0 != e.content.indexOf('-')) ||
          ('rule' == e.type && 0 != e.content.indexOf('@-')) ||
          ('pseudo-class' == e.type && 0 != e.content.indexOf(':-')) ||
          ('pseudo-element' == e.type && 0 != e.content.indexOf('::-')) ||
          ('attr-name' == e.type && 0 != e.content.indexOf('data-'))) &&
        -1 === e.content.indexOf('<') &&
        ('css' == e.language || 'scss' == e.language || 'markup' == e.language)
      ) {
        var t = 'https://webplatform.github.io/docs/',
          n = e.content;
        if ('css' == e.language || 'scss' == e.language)
          (t += 'css/'),
            'property' == e.type
              ? (t += 'properties/')
              : 'rule' == e.type
              ? ((t += 'atrules/'), (n = n.substring(1)))
              : 'pseudo-class' == e.type
              ? ((t += 'selectors/pseudo-classes/'), (n = n.substring(1)))
              : 'pseudo-element' == e.type && ((t += 'selectors/pseudo-elements/'), (n = n.substring(2)));
        else if ('markup' == e.language)
          if ('tag-id' == e.type) {
            if (
              !(a =
                (function (e) {
                  var t = e.toLowerCase();
                  {
                    if (s.HTML[t]) return 'html';
                    if (s.SVG[e]) return 'svg';
                    if (s.MathML[e]) return 'mathml';
                  }
                  if (0 !== s.HTML[t] && 'undefined' != typeof document) {
                    var n = (document
                      .createElement(e)
                      .toString()
                      .match(/\[object HTML(.+)Element\]/) || [])[1];
                    if (n && 'Unknown' != n) return (s.HTML[t] = 1), 'html';
                  }
                  if ((s.HTML[t] = 0) !== s.SVG[e] && 'undefined' != typeof document) {
                    var a = (document
                      .createElementNS('http://www.w3.org/2000/svg', e)
                      .toString()
                      .match(/\[object SVG(.+)Element\]/) || [])[1];
                    if (a && 'Unknown' != a) return (s.SVG[e] = 1), 'svg';
                  }
                  if ((s.SVG[e] = 0) !== s.MathML[e] && 0 === e.indexOf('m')) return (s.MathML[e] = 1), 'mathml';
                  return (s.MathML[e] = 0), null;
                })(e.content) || a)
            )
              return;
            t += a + '/elements/';
          } else if ('attr-name' == e.type) {
            if (!a) return;
            t += a + '/attributes/';
          }
        (t += n), (e.tag = 'a'), (e.attributes.href = t), (e.attributes.target = '_blank');
      }
    });
  }
})();
!(function (e, s) {
  void 0 !== e &&
    e.Prism &&
    e.document &&
    s.createRange &&
    ((Prism.plugins.KeepMarkup = !0),
    Prism.hooks.add('before-highlight', function (e) {
      if (e.element.children.length) {
        var a = 0,
          s = [],
          p = function (e, n) {
            var o = {};
            n || ((o.clone = e.cloneNode(!1)), (o.posOpen = a), s.push(o));
            for (var t = 0, d = e.childNodes.length; t < d; t++) {
              var r = e.childNodes[t];
              1 === r.nodeType ? p(r) : 3 === r.nodeType && (a += r.data.length);
            }
            n || (o.posClose = a);
          };
        p(e.element, !0), s && s.length && (e.keepMarkup = s);
      }
    }),
    Prism.hooks.add('after-highlight', function (n) {
      if (n.keepMarkup && n.keepMarkup.length) {
        var a = function (e, n) {
          for (var o = 0, t = e.childNodes.length; o < t; o++) {
            var d = e.childNodes[o];
            if (1 === d.nodeType) {
              if (!a(d, n)) return !1;
            } else
              3 === d.nodeType &&
                (!n.nodeStart && n.pos + d.data.length > n.node.posOpen && ((n.nodeStart = d), (n.nodeStartPos = n.node.posOpen - n.pos)),
                n.nodeStart && n.pos + d.data.length >= n.node.posClose && ((n.nodeEnd = d), (n.nodeEndPos = n.node.posClose - n.pos)),
                (n.pos += d.data.length));
            if (n.nodeStart && n.nodeEnd) {
              var r = s.createRange();
              return r.setStart(n.nodeStart, n.nodeStartPos), r.setEnd(n.nodeEnd, n.nodeEndPos), n.node.clone.appendChild(r.extractContents()), r.insertNode(n.node.clone), r.detach(), !1;
            }
          }
          return !0;
        };
        n.keepMarkup.forEach(function (e) {
          a(n.element, { node: e, pos: 0 });
        }),
          (n.highlightedCode = n.element.innerHTML);
      }
    }));
})(self, document);
