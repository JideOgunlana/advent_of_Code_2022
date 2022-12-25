'use strict'

import { getLines } from "../utils/utils.js";

class Node {
	constructor (content) {
		this.content = content;
		this.next = null;
		this.prev = null;
	}
}

function addNode(list, content)
{
	if (!list)
	{
		list = new Node(content);
		return list;
	}
	let head = list
	while (head)
	{
		if (head.next == null)
			break;
		head = head.next;
	}
	head.next = new Node(content);
	head.next.prev = head;
	return list;
}

let list = null;

/* let a = new Node('A');
let b = new Node('B');
let c = new Node('C');
let d = new Node('D');

a.next = b;
b.next = c;
b.prev = a;
c.next = d;
c.prev = b;
d.prev = c; */

/* list = addNode(list, 'A');
list = addNode(list, 'B');
list = addNode(list, 'C');
list = addNode(list, 'D'); */

let dir1 = {
	'1': {
		dir: '/',
		'files': ['b.txt', 'c.txt'],
		'sub dir': ['a', 'd'],
		'file size': 400,
		'parent dir': null
	},
}

let dir2 = {
	'2': {
		dir: 'a',
		'files': ['f', 'g', 'h'],
		'sub dir': 'e',
		'file size': 600,
		'parent dir': '/'
	}
}

let dir3 = {
	'3': {
		dir: 'e',
		'files': ['i'],
		'sub dir': null,
		'file size': 1000,
		'parent dir': 'a'
	}
}
let dir4 = {
	'4': {
		dir: 'd',
		'files': ['j', 'd', 'd', 'k'],
		'sub dir': null,
		'file size': 300,
		'parent dir': '/'
	}
}

let fileSystem = {
	'1': {
		dir: '/',
		totalsize: 800
	},

	'2': {
		dir: 'a',
		totalsize: 8000
	},

	3: {
		dir: 'e',
		totalsize: 400
	},

	4: {
		dir: 'd',
		totalsize: 300
	}

}

list = addNode(list, dir1);
list = addNode(list, dir2);
list = addNode(list, dir3);
list = addNode(list, dir4);

// console.log(list);
function printLinkedList(head)
{
	if (head === null) return;
	// console.log(head.content);
	printLinkedList(head.next);
}

printLinkedList(list);

class FolderSytem {
	constructor (index) {
		this.index = index;
	}
}

function createDirInfo(dir, split) {
	let [key, item] = split;
	if (key == 'dir')
	{
		dir.subdir.push(item);
	}
	else
	{
		dir.files.push(item);
		dir.dirFileSize += parseInt(key);
	}

	return dir;
}

const k_combinations = (set, k) => {                                            
	if (k > set.length || k <= 0) {                                               
	  return []                                                                   
	}                                                                             
	if (k === set.length) {                                                       
	  return [set]                                                    
	}                                                                             
	const combs = []                                                              
	if (k === 1) {                                                                
	  for (let i = 0; i < set.length; i++) {                                      
		combs.push([set[i]])                                                      
	  }                                                                           
	  return combs                                                                
	}                                                                             
	for (let i = 0; i < set.length - k + 1; i++) {                                
	  const head = set.slice(i, i + 1)                                            
	  const tailcombs = k_combinations(set.slice(i + 1), k - 1)              
	  for (let j = 0; j < tailcombs.length; j++) {                                
		combs.push(head.concat(tailcombs[j]))                                     
	  }                                                                           
	}                                                                             
	return combs                                                                  
  }                                                                               
																				  
  const combinations = (set) => {                                                 
	const combs = [];                                                             
	for (let k = 1; k <= set.length; k++) {                                       
	  const k_combs = k_combinations(set, k)                                      
	  for (let i = 0; i < k_combs.length; i++) {                                  
		combs.push(k_combs[i])                                                    
	  }                                                                           
	}                                                                             
	return combs                                                                  
  }

function getNeededSizes(directories)
{
	let neededSize = [];
	let allSizes = [];
	let calculatedSizes = [];

	for (let dir of directories)
	{
		if (dir.totalSize <= 100000)
		{
			neededSize.push(dir);
		}
	}
	// for (let i = 0; i < neededSize.length; i++)
	// {
	// 	for (let j = i + 1; j < neededSize.length; j++)
	// 	{
	// 		allSizes.push(neededSize[i].totalSize + neededSize[j].totalSize);
	// 	}
	// }
	// console.log(allSizes);
	allSizes = combinations(neededSize);
	let k = 0;
	for (let i = 0; i < allSizes.length; i++)
	{
		for (let j = 0; j < allSizes[i].length; j++)
		{
			if (isNaN(calculatedSizes[k]))
				calculatedSizes[k] = 0;
			calculatedSizes[k] += allSizes[i][j].totalSize;
			// console.log(allSizes[i][j].totalSize);
		}
		k++;
	}
	console.log(calculatedSizes);
}

function dirTotalSize(directories)
{
	let numOfDir = directories.length;

	for (let i = numOfDir - 1; i >= 0; i--)
	{
		if (directories[i].parent != null)
		{
			directories[i].totalSize += directories[i].dirFileSize;
			directories[directories[i].parentIndex].totalSize += directories[i].totalSize;
			// console.log(directories[i]);
			// console.log(directories[directories[i].parentIndex]);
		}
	}
	directories[0].totalSize += directories[0].dirFileSize;
	return (directories);
}

function parseData(data) {
	let dirIndex = 0;
	let directories = [];
	let level = 0;
	let dirAtLevel = [];
	let cd_folder = false;
	let encountered_dots = false;

	for (let i = 0; i < data.length; i++)
	{
		let split = data[i].split(' ');
		// console.log(split);
		if (split[0] == '$' && split[1] == 'cd' && split[2] != '..')
		{
			directories.push(new FolderSytem(dirIndex));
			directories[dirIndex].dir = split[2];
			// console.log(split[2]);
			directories[dirIndex].subdir = [];
			directories[dirIndex].files = [];
			directories[dirIndex].dirFileSize = 0;
			directories[dirIndex].totalSize = 0;
			directories[dirIndex].parentIndex = null;
			if (encountered_dots)
			{
				// level += 1;
				encountered_dots = false;
			}
			if (split[2] != '/')
			{
				directories[dirIndex].parent = dirAtLevel[level - 1];
				directories[dirIndex].parentIndex = level - 1;
				dirAtLevel[level] = directories[dirIndex].dir;
				// console.log(dirIndex, level);
				cd_folder = true;
			}
			else
			{
				directories[dirIndex].parent = null;
				dirAtLevel[level] = directories[dirIndex].dir;
			}
			level += 1;
			dirIndex++;
		}
		if (split[2] ==  '..')
		{
			// console.log("level was: " + level);
			level -= 1;
			// console.log("level is now: " + level);
			encountered_dots = true;
			if (cd_folder)
				cd_folder = false;
		}
		if (split[0] != '$')
		{
			directories[dirIndex - 1] = createDirInfo(directories[dirIndex - 1], split);
		}
	}
	directories = dirTotalSize(directories);
	getNeededSizes(directories);
}

document.getElementById('input').addEventListener('change', function() {
	const [file] = this.files;
	const reader = new FileReader();
	let data;
	reader.addEventListener('load', () => {
		data = getLines(reader);
		parseData(data);
	});
	if (file)
		reader.readAsText(file);
});