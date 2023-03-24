## warning: LF will be replaced by CRLF

### Windows

```bash
# 提交时转换为 LF，检出时转换为 CRLF
git config --global core.autocrlf true
```

### Linux

```bash
# 提交时转换为 LF，检出时不转换
git config --global core.autocrlf input
```

## 在文件提交时进行 safecrlf 检查

```bash
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true

# 允许提交包含混合换行符的文件
git config --global core.safecrlf false

# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```
