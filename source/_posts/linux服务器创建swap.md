---
title: linux服务器创建swap[译]
categories:
  - 服务器
tags:
  - 服务器
author: 'Jake'
date: 2017-04-04 23:58:19
keywords: linux,服务器,swap,centos,ubuntu,Debian
comments:
original:
permalink:
---

> 原文：[Add Memory Swap - Ubuntu or Debian 7](https://sg.godaddy.com/zh/help/add-memory-swap-ubuntu-or-debian-7-17326)
> 翻译：Jake

如果你想提高你的服务器的性能,增加交换空间(内存交换)是一个强大的和相对简单的开始。

![](//blogimg.jakeyu.top/20170405149132163776809.gif)

<!--more-->


# swap介绍

一旦内存快满的时候,交换空间是一个专用的服务器可以在其内存转储的内容的硬盘。要理解的真正好处,您需要熟悉处理器架构,但这里有一个简要的说明:

* RAM处理器快速提供数据,这使得它非常有价值。
* 一旦你的内存满是它需要删除或移动数据。
* 删除内存的数据意味着它必须找到和检索的硬盘(缓慢)下次请求的数据。
* 通过将数据从内存和交换空间,而不是简单地删除它从RAM,更快找到下一次的数据请求。
* 从内存到交换空间移动数据消耗处理器资源,这样做实际上不断会降低应用程序的性能(这就是所谓的交换)。为了找到最优交换率,它需要调优。

最后———虽然差异是分钟,为了清楚起见,本文将指导您通过创建一个交换文件——不是一个交换分区。如果你不知道这意味着什么,别担心。

# 检查当前使用交换空间

防止添加交换时有任何问题,首先检查你的系统没有启用已经交换空间。

找到任何交换空间驱动:

	sudo swapon -s

如果结果是空的,输出类似于下面的例子,你目前没有交换空间启用:

	Filename                Type        Size    Used    Priority

如果您的系统是否已经配置了交换,结果看起来像这个例子:

	Filename           Type         Size      Used  Priority
	/dev/sda7          partition    123450    100   -1

# 检查你的可用空间

现在,您已经准备好创建一个交换文件,你需要找到你的服务器的硬盘空间。

检查服务器上的可用空间量:

	df -h

这个命令显示了硬盘上的自由空间。在接下来的例子中,你有40 GB可用。确保有足够的自由空间交换文件。取决于你的需求所需要的空间,但一般来说,相当于系统RAM的二倍。

	Filesystem      Size  Used Avail Use% Mounted on    
	/dev/vda         50G  10G   40G   20% /             
	none            4.0K     0  4.0K   0% /sys/fs/cgroup  
	udev            2.0G   12K  2.0G   1% /dev           
	tmpfs           396M  312K  396M   1% /run    
	none            5.0M     0  5.0M   0% /run/lock  
	none            2.0G     0  2.0G   0% /run/shm  
	none            100M     0  100M   0% /run/user      

# 创建一个交换文件

将交换空间添加到系统通过创建一个名为swapfile的文件在你的根目录(/)和分配它作为交换。有两个命令,您可以使用它来创建交换文件:

* fallocate
* dd

你只需要使用其中的一个。我们建议使用fallocate,但如果它不支持的文件系统上,您可以使用dd。

你可以获得更多的文件空间使用`fallocate`,`fallocate `是一个用于操作文件空间的命令。`fallocate`命令创建了一个预先分配大小并且没有初始化的文件,与`dd`命令相比,它需要更长的时间,因为它必须写入0作为虚拟内容。

## 使用fallocate创建一个交换文件

创建用于交换的文件。对于这个示例,我们添加一个4 GB的文件:

	sudo fallocate -l 4G /swapfile

确认正确的数量的空间被保留:

	ls -lh /swapfile

这个结果表明,添加文件是使用正确的留出的空间量:

	-rw------- 1 root root 4.0G Jul 08 10:52 /swapfile

如果你得到一个失败消息说fallocate失败:操作不支持,您的文件系统目前不支持fallocate(例如,ext3)。使用更传统的方式使用dd命令。(这种情况应该很少)。

## 使用dd创建一个交换文件

在这个例子中,我们将添加一个不同大小的交换文件,1 GB,为了适应小型服务器。

添加1 GB交换文件,通过指定一个块大小250MB并且数量为4。

> 记得要仔细检查你的指令!这个命令有可能破坏数据如果(输出文件)指出错误的位置。

	sudo dd if=/dev/zero of=/swapfile bs=250M count=4

几秒钟后,生成的输出是这样的:

	4+0 records in
	4+0 records out
	1048576000 bytes (1.0 GB) copied, 1.47414 s, 711 MB/s

验证文件在服务器上创建:

	ls -lh /swapfile

如果文件被创建,命令返回类似于:

	-rw-r--r-- 1 root root 1.0G Jul 08 10:30 swapfile

# 使交换文件

现在创建的文件,格式互换,然后启用它。

锁定交换文件的权限,因此只有`root`用户可以访问它:

	sudo chmod 600 /swapfile

当第一次创建时,交换文件是可读的,所以锁权限可以防止用户阅读潜在的敏感信息。

确认文件正确的权限:

	ls -lh /swapfile

这个命令返回类似于:

	-rw------- 1 root root 4.0G Jul 08 10:40 /swapfile

这证实了,只有`root`用户启用了读写权限。

格式文件创建一个交换空间:

	sudo mkswap /swapfile

如果成功,该命令会返回类似这样:

	Setting up swapspace version 1, size = 4194300 KiB
	no label, UUID=e2f1e9cf-c0a9-4ed4-b8ab-714b8a7d6944

挂载/启用系统中的交换空间:

	sudo swapon /swapfile

验证交换空间是通过检查系统报告:

	sudo swapon -s

这个命令返回类似于:

	Filename Type Size Used Priority
	swapfile file 4194300 0 -1

# 使交换文件永久生效

最后一步是将交换文件集成到您的系统的存储分区,通过`fstab `。

打开`fstab `

	sudo vim /etc/fstab

在fstab文件最后,添加这一行告诉系统自动使用新创建的交换空间:

	/swapfile none swap sw 0 0

保存并关闭该文件:

	:wq!

在下次重新启动后,自动交换使用

# 调整交换文件

现在您已经创建了交换文件,你应该进行调优,以确保它给你最佳性能。这不是你可以轻松地一口气就完成的工作，而是你会定期的作为管理员工作。

优化你的交换文件意味着修补的设置,使其执行交换(也就是说,将内容从RAM交换):

* 虚拟运存控制
* 缓存压力
调优是很重要的,因为一个配置不佳的交换文件会损害应用程序的性能。系统的RAM和交换空间之间的相互作用是时间密集的（在计算规模上），并且尝试交换频率太高（即交换冲突）可能需要更多的时间，而不仅仅是从硬盘中恢复数据。

## 虚拟运存控制

Swappiness只是设置控制频率使用交换文件。

一个0到100之间的比例,swappiness值:

* 0意味着避免交换过程的物理内存,直到绝对必要的(内存耗尽)
* 100意味着积极(立刻)移动交换过程的物理内存和交换缓存

你可以改变你的服务器的`swapiness`在`sysctl.conf`文件中。

打开`/etc/sysctl.conf`:

	sudo vim /etc/sysctl.conf

在文件的最后一行添加:

	vm.swappiness=10

保存并且退出:

	:wq!

来优化您的应用程序中,您可以测试更改swappiness值(0到100之间)和运行性能测试。

## 缓存压力

另一个设置是`vfs_cache_pressure`。 当VFS（虚拟文件系统）缓存对象（称为dentry和inode_cache对象）占用更大量的内存而不是其他数据（如页面缓存和交换）时，更改此设置可能会有所帮助。 因为VFS缓存访问有关文件系统的数据，所以经常被请求并且非常耗资源。 因此，它是您的系统缓存的主要设置。

`vfs_cache_pressure`的值越高，您的服务器越有可能使用其交换。

你可以改变你的服务器的缓存压力在`sysctl.conf`。

打开`/etc/sysctl.conf`:

	sudo vim /etc/sysctl.conf

在文件最后一行添加:

	vm.vfs_cache_pressure = 50

保存并关闭文件:

	:wq!

像`swappiness`,你可以提高性能通过测试不同的值。

# 启用交换空间

使用以下三个命令检查您的工作：

## swapon -s命令：

	sudo swapon -s

输出可能如下所示：

	Filename                Type        Size    Used    Priority
	/swapfile               file        4194300 0       -1

您会看到添加了4 G的交换文件。

## 有关更详细的报告：

	free -m

## 关于交换详细信息的报告：

	cat /proc/meminfo | grep -i swap

# 结论

交换可以有利于允许您的系统利用比原来可用的更多的内存。 在优化应用程序配置，添加更多RAM或升级服务器之前，这是一个可行的选择。

但是，请务必记住定期调整交换文件，以确保您最充分地使用它。
