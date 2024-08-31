const fs = require('fs');
const path = require('path');

const LanguageMap = {
	JP: { code: 'JP', shortName: '日', fullName: '日语' },
	CHN: { code: 'CHN', shortName: '中', fullName: '简中' },
	CHT: { code: 'CHT', shortName: '中', fullName: '繁中' },
};

function parseFileTextToMap(list) {
	return list.reduce((prev, curr, currentIndex) => {
		if (curr.startsWith('00:')) {
			prev[curr] = {
				currentIndex,
				range: curr,
				text: list[currentIndex + 1],
			}
		}
		return prev;
	}, {});
}

// 合并两个文件，生成对应的 list
/**
 * @params params.title {string} - 标题
 * @params params.targetFile {string} - 生成字幕文件路径
 * @params params.row1Language {string} - 文件 1 的语言
 * @params params.filePath1 {string} - 文件 1 的路径
 * @params params.row2Language {string} - 文件 2 的语言
 * @params params.filePath2 {string} - 文件 2 的路径
 * @returns {{title, list: [{}]}}
 */
function merge2FilesSubtitles(params) {
	const fileText1 = fs.readFileSync(params.filePath1, 'utf-8');
	const fileText2 = fs.readFileSync(params.filePath2, 'utf-8');
	
	const fileText1List = fileText1
		.split('\n')
		.filter(Boolean)
		.filter(text => text.trim())
		.join('')
		.split('\r')
		.filter(Boolean);
	const fileText2List = fileText2
		.split('\n')
		.filter(Boolean)
		.filter(text => text.trim())
		.join('')
		.split('\r')
		.filter(Boolean);
	
	const fileText1Map = parseFileTextToMap(fileText1List);
	const fileText2Map = parseFileTextToMap(fileText2List);
	
	const fileText1ListLength = fileText1List.length;
	const fileText2ListLength = fileText2List.length;
	
	const loopList = fileText1ListLength > fileText2ListLength ? fileText1List : fileText2List;
	
	const resultList = [];
	
	loopList.forEach((text, index) => {
		if (text.startsWith('00:')) {
			const fileText1Item = fileText1Map[text];
			const fileText2Item = fileText2Map[text];
			const item = {};
			item.range = text;
			
			if (fileText1Item) {
				const languageItem = LanguageMap[params.row1Language] || {};
				item.row1Language = languageItem.shortName || '日';
				item.row1Text = fileText1Item.text;
			}
			
			if (fileText2Item) {
				const languageItem = LanguageMap[params.row2Language] || {};
				item.row2Language = languageItem.shortName || '中';
				item.row2Text = fileText2Item.text;
			}
			
			resultList.push(item);
		}
	});
	
	return {
		title: params.title,
		targetFile: params.targetFile,
		list: resultList,
	};
}

// 把多个文件列表，组合成可以多次调用 mergeSubtitles
function batchMergeSubtitles(list) {
	const resultList = [];
	
	list.forEach((item) => {
		const result = merge2FilesSubtitles(item);
		resultList.push(result);
	});
	
	return resultList;
}

/**
 * 把生成的字幕结果，写入到不同类型的文件里
 * 类型1：打印出来，保留两种语言，不需要时间轴
 * 类型2：作为视频字幕，保留两种语言，需要时间轴
 */
function generateTargetSubtitlesFile(list, type = '1') {
	const mergeList = batchMergeSubtitles(list);

	// type === 1 转为打印出来的字幕
	
	if (type === '1') {
		let subTitleText = '';
		mergeList.forEach(fileItem => {
			const title = fileItem.title;
			const subTitleList = fileItem.list;
			
			const result = subTitleList.map((subItem) => {
				const row1Text = subItem.row1Text || '';
				const row2Text = subItem.row2Text || '';
				return `${subItem.row1Language}：${row1Text}\n${subItem.row2Language}：${row2Text}\n`;
			}).join('\n');
			
			subTitleText += `## ${title}\n\n${result}\n\n`;
			
			fs.writeFileSync(fileItem.targetFile, subTitleText);
		});
	}
	
	// type === 2 转为视频字幕
	
}

const inputFileList = [
	{
		title: '重启人生 「ブラッシュアップライフ」[brushup-life] S01E01',
		filePath1: path.resolve(__dirname, './inputFiles/brushup-life/S01E01_jp.srt'),
		filePath2: path.resolve(__dirname, './inputFiles/brushup-life/S01E01_chn.srt'),
		targetFile: path.resolve(__dirname, './outputFiles/brushup-life/S01E01.md'),
	},
].map(item => {
	return {
		...item,
		row1Language: LanguageMap.JP.code,
		row2Language: LanguageMap.CHN.code,
	}
})


generateTargetSubtitlesFile(inputFileList, '1');
