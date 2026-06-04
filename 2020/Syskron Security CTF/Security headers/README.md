<nav style="background:#1e1e1e;color:#fff;padding:10px;display:flex;gap:15px;font-family:Arial,Helvetica,sans-serif;">
<a href="https://0xlightning.github.io/CTF-Players/" style="color:#00D9FF;text-decoration:none;">Home</a>
<a href="https://0xlightning.github.io/CTF-Players/2020/" style="color:#00D9FF;text-decoration:none;">2020</a>
</nav>
<div style="margin:10px 0;font-size:14px;"><span style="color:#00D9FF"><a href="https://0xlightning.github.io/CTF-Players/" style="color:#00D9FF;text-decoration:none;">Home</a></span> &gt; <span style="color:#00D9FF"><a href="https://0xlightning.github.io/CTF-Players/2020/" style="color:#00D9FF;text-decoration:none;">2020</a></span> &gt; <span style="color:#00D9FF"><a href="https://0xlightning.github.io/CTF-Players/2020/Syskron Security CTF/" style="color:#00D9FF;text-decoration:none;">Syskron Security CTF</a></span> &gt; <span style="color:#00D9FF"><a href="https://0xlightning.github.io/CTF-Players/2020/Syskron Security CTF/Security headers/" style="color:#00D9FF;text-decoration:none;">Security headers</a></span></div>

# Security headers

>Web

>Points - 100

>Can you please check the security-relevant HTTP response headers on www.senork.de. Do they reflect current best practices?

---

One of the easier web challenges. Simply take a look at the response headers the web server sends you when you request the page.

Here you'll find one interesting one: `Flag-Policy`. The value is the flag: `syskronCTF{y0u-f0und-a-header-flag}`
